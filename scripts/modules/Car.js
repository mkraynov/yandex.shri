/**
 * Created with IntelliJ IDEA.
 * User: mikhailkrainov
 * Date: 7/28/12
 * Time: 9:41 PM
 * To change this template use File | Settings | File Templates.
 */
define(function(){

    /**
     * Создает экземпляр Машины
     * @this {Car}
     * @param {string} manufacturer Производитель
     * @param {string} model Модель
     * @param {number} year Год производства
     */
    function Car(manufacturer, model, year) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year ? year : (new Date()).getYear();
    }

    Car.prototype.toString = function() {
        return this.manufacturer + " " + this.model + " " + this.year;
    }

    Car.prototype.getInfo = Car.prototype.toString;

    Car.prototype.getDetailedInfo = function() {
        var info = [];
            info.push("Производитель:");
            info.push(this.manufacturer + ".");
            info.push("Модель:");
            info.push(this.model + ".");
            info.push("Год:");
            info.push(this.year);
        return info.join(" ");
    }
// console.log(bmw); // BMW X5 2010
// console.log(bmw.getInfo()); // BMW X5 2010
// console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010

    /**
     * Возвращает страну-производителя машины
     * @private
     * @return {String}
     */
    function getCountry() {
        switch (this.manufacturer.toLowerCase()) {
            case 'bmw':
            case 'audi':
                return 'Germany';

            case 'toyota':
                return 'Japan';
        }
    }

    /**
     * Паблик-обертка для приватного метода getCountry
     * @public
     * @return {string}
     */
    Car.prototype.getCountry = function() {
        return getCountry.call(this);
    }

    return Car;
});