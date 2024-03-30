import { history } from "umi";

export default function Index(){
  history.replace("/overview");
  return null;
}