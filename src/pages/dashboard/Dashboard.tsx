import { FerramentasDaListagens } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {

  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={(
        <FerramentasDaListagens
          mostrarInputBusca
          textoBotaoNovo='Nova'
        />
      )}
    >
      Testando
    </LayoutBaseDePagina>
  );
};