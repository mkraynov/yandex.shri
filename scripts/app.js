/**
 * Created with IntelliJ IDEA.
 * User: mikhailkrainov
 * Date: 7/28/12
 * Time: 9:43 PM
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl: "/scripts/modules"
})
require(["Car","CarDealer"], function(Car,CarDealer){

    var bmw = new Car("BMW", "X5", 2010),
        audi = new Car("Audi", "Q5", 2012),
        toyota = new Car("Toyota", "Camry");



    var yandex = new CarDealer('Яндекс.Авто');

    yandex
        .add(toyota)
        .add(bmw, audi);

// @TODO: реализовать метод установки цены на машину
    /**
     * Установить цену на машину
     * @param {string} car идентификатор машины
     * @param {string} price стоимость
     */
// идентификатор машины составляется следующим образом "производитель модель год"
// стоимость машины может быть задана в двух валютах: йена и евро.
    yandex
        .setPrice('BMW X5 2010', '€2000')
        .setPrice('Audi Q5 2012', '€3000')
        .setPrice('Toyota Camry 2012', '¥3000');

    yandex.list(); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
    yandex.listByCountry('Germany'); //BMW X5 2010, Audi Q5 2012

// @TODO: бонус! выводить список машин с ценой в рублях.
//Подробнее: http://company.yandex.ru/job/vacancies/shri.xml

});