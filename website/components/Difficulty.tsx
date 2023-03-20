import { useI18n } from '@/i18n'

// TODO: Refactor this component
export const Difficulty = ({ level }: { level: string }) => {
  const { t } = useI18n()

  return (
    <div
      sx={{
        padding: '15px 0px 18px',
        borderTop: 'White16',
        borderBottom: 'White16',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <p
        sx={{
          fontSize: '0.9rem',
          margin: 0,
        }}
      >
        {t('global.technicalLevelRequired')}
      </p>
      <div
        sx={{
          bg: 'Purple32',
          borderRadius: '14px',
          padding: '6px 12px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          sx={{
            fontFamily: 'EuclidCircular',
            fontWeight: 600,
            fontSize: '0.65rem',
            lineHeight: '12px',
            margin: 0,
            letterSpacing: '1.2px',
          }}
        >
          {level}
        </p>
      </div>
    </div>
  )
}
