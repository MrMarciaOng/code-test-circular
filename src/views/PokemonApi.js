import React, { useState } from "react";
import { Button, Alert, Input, Table, Container,Col,Row } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const PokemonApiComponent = () => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
    pokemonName : null
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(state.pokemonName)
      const response = await fetch(`${apiOrigin}/api/pokemon?pokemonName=${state.pokemonName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };


  return (
    <>

      <div className="mb-5">
        {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}


        <Container>
          <Row>
          <Col sm="4">
            <Input
              id="pokemonName"
              name="pokemonName"
              placeholder="Will load random pokemon if empty"
              value={state.pokemonName}
              onChange={e => setState( {...state, pokemonName: e.target.value})}
              style={{ width: "300px" }}
            /> 
          </Col>
          <Col sm="4">
          <Button
            color="primary"
            onClick={callApi}
            disabled={!audience}
          >
            Load Pokemon
          </Button>
          </Col>

          </Row>


        </Container>

      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6>Result</h6>
            {state.showResult && (
              <img src={state.apiMessage.sprites.front_default} style={{ width: '250px', height: '250px' }} />

            )}
            <div style={{ width: '250px' }}>
              <Table borderless>
                <thead>
                  <tr>
                    <th>
                      Type Of stats
                    </th>
                    <th>
                      Base
                    </th>
                    <th>
                      Effort
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.apiMessage.stats.map(d => (<tr>
                    <td style={{ width: "180px" }}>{d.stat.name.toUpperCase()}</td>
                    <td >{d.base_stat}</td>
                    <td >{d.effort}</td>  </tr>))}

                </tbody>
              </Table>
            </div>


            {/* <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight> */}
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(PokemonApiComponent, {
  onRedirecting: () => <Loading />,
});
