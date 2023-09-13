import { FerramentasDeConfiguracao } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {

  return (
    <LayoutBaseDePagina
      titulo='Configuração'
      barraDeFerramentas={(
        <FerramentasDeConfiguracao />
      )}
    >


    </LayoutBaseDePagina>
  );
};