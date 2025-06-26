import { redirect } from "next/navigation";

export default function AdminPage() {

  //Carrega quando faz o login
  redirect("/admin/dashboard");
  
}