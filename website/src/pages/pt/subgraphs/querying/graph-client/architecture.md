# Arquitetura do The Graph Client

Para resolver a necessidade de oferecer apoio a uma rede distribuída, temos planos para garantir que o Graph Client forneça tudo que o aplicativo precisa:

1. Composição de múltiplos subgraphs (no lado do cliente)
2. Retorno a múltiplos indexadores/fontes de dados/serviços hospedados
3. Estratégia de seleção de fonte: automática/manual
4. Núcleo agnóstico, capaz de integrar com qualquer cliente GraphQL

## Modo avulso

```mermaid
graph LR;
    c[Browser/Node]-->|executes|g[Graph-Client];
    g-->op[Orquestrador/Planejador de Queries]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Com qualquer cliente GraphQL

```mermaid
graph LR;
    c[Any GraphQL Client]-->|fetch/Urql Exchange/Apollo Link|l[Camada de Compatibilidade];
    l-->|executes|g[Graph-Client];
    g-->op[Orquestrador/Planejador de Queries]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Composição de Subgraph

Para permitir uma composição simples e eficiente do lado do cliente, utilizaremos [`graphql-tools`](https://graphql-tools.com) para criar um esquema remoto / Executor, que pode ser ligado ao cliente GraphQL.

A API poderia consistir de transformadores brutos `graphql-tools`, ou usar a [API declarativa da GraphQL-Mesh](https://graphql-mesh.com/docs/transforms/transforms-introduction) para compor o esquema.

```mermaid
graph LR;
    g[Schema GraphQL/Executor]-->m{Composer};
    m-->s1[Schema GraphQL do Subgraph A];
    m-->s2[Schema GraphQL do Subgraph B];
    m-->s3[Schema GraphQL do Subgraph C];
```

## Estratégias de Execução de Subgraph

Dentro de cada Subgraph definido como fonte, haverá uma maneira de definir o seu indexador(es) de fontes e a estratégia de queries; veja algumas opções:

```mermaid
graph LR;
    subgraph race
    req(Outgoing Query)-->sA[Subgraph A];
    sA-->d{RaceStrategy};
    d-->s1[Source 1];
    d-->s2[Source 2];
    s1-->d;
    s2-->d;
    end

    subgraph fallback
    req2(Outgoing Query)-->sA2[Subgraph A];
    sA2-->d2{FallbackStrategy};
    d2-->s3[Source 1];
    s3-->|error|s4[Source 2];
    s4-->|ok|d2;
    s3-->|ok|d2;
    end

    subgraph retry
    req3(Outgoing Query)-->sA3[Subgraph A];
    sA3-->d3{RetryStrategy};
    d3-->s5[Source 1];
    s5-->|error|s5;
    s5-->|ok|d3;
    end

    subgraph highestValue
    req4(Outgoing Query)-->sA4[Subgraph A];
    sA4-->d4{HighestValueStrategy};
    d4-->s14[Source 1];
    d4-->s24[Source 2];
    s14-->synced4["process"]
    s24-->synced4
    synced4-->|"max(_meta.block_number)"|d4
    end
```

> Podemos enviar várias estratégias embutidas, junto a uma interface simples para permitir que os programadores escrevam as suas próprias.

Para levar o conceito de estratégias ao extremo, podemos até construir uma camada mágica com um modelo de assinatura-como-query, com qualquer gancho, e fornecer um DX suave para dapps:

```mermaid
graph LR;
    app[App]-->|subscription somedata|c;
    c[Qualquer Cliente GraphQL]-->l[Camada de Compatibilidade];
    l-->|executes|g[Schema da GraphQL/Executor];
    g-->op[Orquestrador]
    op-->|query somedata|sA[Subgraph];
    sc[Contrato Inteligente]-->|change event|op;
```

Com este mecanismo, os programadores podem escrever e executar o `subscription` da GraphQL, mas em segundo plano, executaremos um `query` da GraphQL para os indexadores do The Graph e vamos conectar qualquer gancho/sonda externa para executar a operação novamente.
Assim, poderemos procurar mudanças no Contrato Inteligente, e o cliente da GraphQL preencherá o vazio da necessidade de fazer mudanças em tempo real a partir do The Graph.
