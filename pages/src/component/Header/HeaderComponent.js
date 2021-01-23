export const HeaderComponent = (props) => {
  const {name = 'Bomb Server'} = props ?? {};
  return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        background: 'darkgreen',
      }}>
        <h1 style={{
          fontSize: 40,
          fontWeight: 'bold',

        }}>{name}</h1>
      </div>
  );
};