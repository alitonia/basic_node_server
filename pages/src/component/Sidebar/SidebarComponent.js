export const SidebarComponent = (props) => {
  const mockRoutes = ['Home', 'Bike', 'Chicken'];

  return (
      <div style={{
        background: 'grey',
        minHeight: '200px',
        minWidth: '100px',
        paddingLeft: '10px'
      }}>
        {mockRoutes.map(routeName => {
          return (
              <h3>{routeName}</h3>
          );
        })}
      </div>
  );
};