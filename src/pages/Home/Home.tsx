import { FC, useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import json2mq from 'json2mq';
import AuthService from '../../services/AuthService';
import { useGetResourcesQuery } from '../../services/redux/API.Service';
import HomeResources from './HomeResources';
import * as MatIcon from '@mui/icons-material';

import styles from './Home.module.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  useEffect(AuthService.PreventAccess(useNavigate()));
  let { type } = useParams();
  const [selectedResource, setSelectedResource] = useState(type);

  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  const isBigScreenOrHome = () => matches || type === undefined;
  let bigScreenOrHome = isBigScreenOrHome();

  const [showResourcesMenu, setShowResourcesMenu] = useState(bigScreenOrHome);
  const { data, error, isLoading } = useGetResourcesQuery('');

  if (type !== selectedResource) {
    setSelectedResource(type);
    setShowResourcesMenu(bigScreenOrHome);
  }

  const loadingTemplate = () => (
    <div>
      <h2>Loading...</h2>
    </div>
  );

  const errorTemplate = () => {
    return (
      <div>
        <h2 className={styles.ErrorBox}>Error</h2>
      </div>
    );
  };
  
  const toggleResourcesMenu = () => {
    setShowResourcesMenu(!showResourcesMenu);
  };

  const resourceBtnTemplate = (res: string, showBtns: boolean) => {
    if (showBtns === false && selectedResource !== res) {
      return (<div key={res}></div>);
    }

    return (
      <Button key={res}>
        <Link className={styles.Button} to={'/home/' + res}>{res}</Link>
      </Button>
    );
  };
  const dataTemplate = () => (
    <div className={styles.Home} data-testid="Home">
      <ButtonGroup orientation={ matches ? 'horizontal' : 'vertical' } className={styles.Buttons} variant="contained" aria-label="outlined primary button group">
        {resources.map((res) => resourceBtnTemplate(res, showResourcesMenu))} 
        { matches || !selectedResource ? '' : <IconButton onClick={toggleResourcesMenu}>
          { showResourcesMenu ? <MatIcon.KeyboardDoubleArrowUp /> : <MatIcon.KeyboardDoubleArrowDown /> }
          </IconButton> }
      </ButtonGroup>
      { selectedResource ? <HomeResources resource={selectedResource} /> : '' }
    </div>
  );

  if (isLoading) return loadingTemplate();
  if (error) return errorTemplate();

  let resources: Array<string> = [];
  if (data) {
    resources = Object.keys(data);
  }

  return dataTemplate();
}
export default Home;
