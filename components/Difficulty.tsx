export const Difficulty = ({ level }: { level: string }) => {
  return (
    <div
      sx={{
        padding: '15px 0px 18px',
        borderTop: (theme) => `1px solid ${theme.colors!.White16}`,
        borderBottom: (theme) => `1px solid ${theme.colors!.White16}`,
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
        Technical Level Required
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
