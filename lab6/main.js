import {MainPage} from "./pages/main/index.js"; //импорт класса
const root = document.getElementById('root');
const mainPage = new MainPage(root);            //создание экземпляра
mainPage.render();
//отображение содержимого в элементе root
//имеем класс MainPage, добавляем сюда его вызов