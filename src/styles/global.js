import { injectGlobal } from "styled-components";

injectGlobal`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    outline:none;
  }

  body{
    background:#9b65e6;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }
`;
