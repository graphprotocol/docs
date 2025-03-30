# The Graph İstemcisi Mimarisi

Dağıtık bir ağı destekleme ihtiyacını karşılamak için, The Graph istemcisinin uygulamaların ihtiyaç duyduğu her şeyi temin etmesini sağlayacak çeşitli adımlar atmayı planlıyoruz:

1. Birden fazla Subgraph'i (istemci tarafında) birleştirme
2. Birden fazla endeksleyici/kaynak/sağlayıcı hizmetine geri dönüş (fallback) mekanizması
3. Otomatik/Manuel kaynak seçme stratejisi
4. Herhangi bir GraphQL istemcisiyle entegre olabilen, bağımsız (agnostik) çekirdek yapısı

## Bağımsız (standalone) mod

```mermaid
graph LR;
    c[Browser/Node]-->|executes|g[Graph-Client];
    g-->op[Orchestrator/Query Planner]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Herhangi bir GraphQL istemcisiyle

```mermaid
graph LR;
    c[Any GraphQL Client]-->|fetch/Urql Exchange/Apollo Link|l[Compatibility Layer];
    l-->|executes|g[Graph-Client];
    g-->op[Orchestrator/Query Planner]
    op-->sA[Subgraph A];
    op-->sB[Subgraph B];
```

## Subgraph Bileşimi (Subgraph Composition)

Basit ve verimli istemci tarafı bileşimini mümkün kılmak için [`graphql-tools`](https://graphql-tools.com) kullanarak uzak bir şema / Executor oluşturacağız ve bu yapı daha sonra GraphQL istemcisine entegre edilebilecek.

API, şema bileşimi için ya doğrudan `graphql-tools` dönüştürücüleri (transformers) ile ya da [GraphQL-Mesh declarative API](https://graphql-mesh.com/docs/transforms/transforms-introduction) ile kullanılabilir.

```mermaid
graph LR;
    g[GraphQL Schema/Executor]-->m{Composer};
    m-->s1[Subgraph A GraphQL schema];
    m-->s2[Subgraph B GraphQL schema];
    m-->s3[Subgraph C GraphQL schema];
```

## Subgraph Yürütme Stratejileri

Kaynak olarak tanımlanan her bir Subgraph içerisinde, o Subgraph'in bağlı olduğu kaynak(lar)ın endeksleyicisini ve sorgulama stratejisini tanımlamak mümkündür. İşte bazı seçenekler:

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

> Geliştiricilerin kendi stratejilerini yazabilmeleri için basit arayüzlerle birlikte, birkaç hazır strateji sunabiliriz.

Strateji kavramını en uç noktaya taşımak adına, herhangi bir hook ile çalışan ve abonelik modeliyle sorgu (subscription-as-query) yapan sihirli bir katman bile oluşturabiliriz. Bu sayede dapp’ler için akıcı bir geliştirici deneyimi (DX) sunabiliriz:

```mermaid
graph LR;
    app[App]-->|subscription somedata|c;
    c[Any GraphQL Client]-->l[Compatibility Layer];
    l-->|executes|g[GraphQL Schema/Executor];
    g-->op[Orchestrator]
    op-->|query somedata|sA[Subgraph];
    sc[Smart Contract]-->|change event|op;
```

Bu mekanizma sayesinde geliştiriciler GraphQL `subscription`ı yazıp çalıştırabilir, ancak arka planda The Graph endeksleyicilerine bir GraphQL `query`si gönderilir ve işlemin yeniden çalıştırılmasını sağlayacak harici bir hook/probe bağlantısına izin verilir. Bu sayede, doğrudan Akıllı Sözleşme üzerindeki değişiklikler izlenebilir ve GraphQL istemcisi, The Graph'ten gerçek zamanlı değişiklik ihtiyacını karşılayacak şekilde devreye girer.
