import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import NovaOcorrencia from './pages/NovaOcorrencia/NovaOcorrencia';


export default function Routes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={App} />
			<Route path="/nova-ocorrencia" component={NovaOcorrencia} />
		</BrowserRouter>
	);
}