/**
 * Created with IntelliJ IDEA.
 * User: mikhailkrainov
 * Date: 7/28/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
define(["/yandex/yandex.shri/scripts/libs/money.min.js"],function(money){

    // Настраиваем внешний скрипт обмена валюты
    money.base = "USD";
    money.rates = {
        "EUR": 0.811749,
        "JPY": 78.508434,
        "RUB": 32.078539
    };

    /**
     * Создает экземпляр Автосалона
     * @this {CarDealer}
     * @param {string} name Название автосалона
     */
    function CarDealer(name) {
        this.name = name;
        this.cars = [];
    }

    /**
     * Добавляет машины в автосалон, принимает одну или несколько машин
     * Возвращает инстанс автосалона для чейнинга
     * @public
     * @return {CarDealer}
     */
    CarDealer.prototype.add = function(){
        var i = arguments.length;
        while(i--) {
            this.cars.push( Array.prototype.shift.call(arguments,arguments[i]) )
        }
        return this;
    }

    /**
     * Установить цену на машину
     * Возвращает инстанс автосалона для чейнинга
     * @public
     * @param {string} id идентификатор машины
     * @param {string} price стоимость
     * @return {CarDealer}
     */
    CarDealer.prototype.setPrice = function(id, price){
        var car = getCarById.call(this, id);

        if (car === null) {
            console.log("CarDealer.prototype.setPrice: There's no car with id: " + id + " in " + this.name);
        }

        storePrice.call(this, car, price);

        return this;
    }

    /**
     * Находит машину по идентификатору
     * @private
     * @param {string} id идентификатор машины
     * @return {Car}
     */
    function getCarById(id){
        var car = null,
            i;

        if (!(this instanceof CarDealer)) {
            console.log("getCarById: wrong context");
            return null;
        }

        for (i = this.cars.length; i--;) {
            if (this.cars[i] && this.cars[i].toString() === id) {
                return this.cars[i];
            }
        }

        return car;
    }

    /**
     * Записывает информацию о цене на машину
     * @private
     * @param {Car} car
     * @param {string} price
     */
    function storePrice(car, price) {
        var reg = /^[0-9]*$/;

        price = money( reg.test(price.charAt(0)) ? price : price.slice(1) )
                    .from( detectCurrency(price) )
                    .to("RUB");

        console.log("RUB: " + price);
    }

    /**
     * Выводит в консоль список автомобилей в автосалоне
     * @public
     */
    CarDealer.prototype.list = function() {
        console.log(this.cars.join(", "));
    }

    /**
     * Выводит в консоль список автомобилей в автосалоне, отсортированный по стране
     * @public
     * @param {string} country
     */
    CarDealer.prototype.listByCountry = function(country) {
        var filteredArr = [],
            i,
            length = this.cars.length;

        for (i = 0; i < length; i++) {
            if (this.cars[i].getCountry() === country) {
                filteredArr.push(this.cars[i]);
            }
        }

        console.log(filteredArr.join(", "));
    }


    /**
     * Определяет валюту и возвращает ее международный код для обменника
     * @param {string} price цена
     * @return {String}
     */
    function detectCurrency(price) {
        switch (price.charAt(0)) {
            case "€":
                return "EUR";
            case "¥":
                return "JPY";
            default:
                return "RUB";
        }
    }

    return CarDealer;
})