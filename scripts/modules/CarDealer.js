/**
 * Created with IntelliJ IDEA.
 * User: mikhailkrainov
 * Date: 7/28/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
define(function(){
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
     * @public
     */
    CarDealer.prototype.add = function(){
        if (arguments.length === 1) {
            addCar.call(this, arguments[0]);
        } else if (arguments.length > 1) {
            addCars.apply(this, arguments);
        }
    }

    /**
     * Добавляет машину в автосалон
     * @private
     * @param {Car} car машина
     */
    function addCar(car){
        if (!(this instanceof CarDealer)) {
            console.log("addCar: wrong context");
            return;
        }

        this.cars.push(car);
    }

    /**
     * Добавляет несколько машин в автосалон
     * @private
     * @param {Array} carArray массив машин
     */
    function addCars(carArray){
        if (!(this instanceof CarDealer)) {
            console.log("addCars: wrong context");
            return;
        }

        var i = carArray.length;
        while(i--) {
            addCar.call(this,carArray.shift());
        }
    }

    /**
     * Установить цену на машину
     * @public
     * @param {string} id идентификатор машины
     * @param {string} price стоимость
     */
    CarDealer.prototype.setPrice = function(id, price){
        var car = getCarById.call(this, id);

        if (car === null) {
            console.log("CarDealer.prototype.setPrice: There's no car with id: " + id + " in " + this.name);
        }

        storePrice.call(this, car, price);
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

    return CarDealer;
})