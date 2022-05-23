import React from "react";
import {render} from 'react-dom';
import './app.css'
import Main from './src/components/Main';
import { BrowserRouter } from "react-router-dom";

render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    , document.getElementById('app'));

