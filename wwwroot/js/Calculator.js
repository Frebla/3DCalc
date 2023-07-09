$(function () {
    const app = Vue.createApp({
        data() {
            return {
                TypeList: [],
                PlasticList: [],
                PrinterList: [],
                modelMinutes: 60,
                sliceCount: 1,
                printCount: 1,
                postMinutes: 10,
                selectedType: 1,
                selectedPlastic: 1,
                selectedPrinter: 1,
                difficult: 1,
                sizeL: 18,
                sizeW: 0,
                sizeD: 0,
                weightOne: 0,
                quantity: 1,
                printingHours: 0,
                totalAll: "0",
                totalOne: "0"
            }
        },
        mounted() {
            let self = this;
            $.get(appPath + 'Home/GetSettings', {}, function (response) {
                debugger;
                self.TypeList = response.typeList;
                self.PlasticList = response.plasticList;
                self.PrinterList = response.printerList;
            });
        },
        methods: {
            calculate() {
                let dto = {
                    type: this.selectedType,
                    plastic: this.selectedPlastic,
                    sliceCount: this.sliceCount,
                    printCount: this.printCount,
                    postMinutes: this.postMinutes,
                    printingHours: this.printingHours,
                    printer: this.selectedPrinter,
                    modelMinutes: this.modelMinutes,
                    weightOne: this.weightOne,
                    quantity: this.quantity
                };
                let self = this;
                $.get(appPath + 'Home/Calculate', dto, function (response) {
                    self.totalAll = response.priceTotalAll;
                    self.totalOne = response.priceTotalOne;
                });
            },
            calculateWithTime() {
                let dto = {
                    type: this.selectedType,
                    plastic: this.selectedPlastic,
                    sliceCount: this.sliceCount,
                    printCount: this.printCount,
                    postMinutes: this.postMinutes,
                    printingHours: this.printingHours,
                    printer: this.selectedPrinter,
                    modelMinutes: this.modelMinutes,
                    weightOne: this.weightOne,
                    quantity: this.quantity
                };
                let self = this;
                $.get(appPath + 'Home/CalculateWithTime', dto, function (response) {
                    self.totalAll = response.priceTotalAll;
                    self.totalOne = response.priceTotalOne;
                });
            },

            checkPass() {
                bootbox.prompt({
                    title: "Пароль:",
                    inputType:'password',
                    callback: function (result) {
                        if (result != null) {
                            $.post(appPath + 'Home/checkPass', { pass: result }, function (response) {
                                if (response == true) {
                                    document.location = appPath + 'Home/Settings';
                                }
                                else {
                                    bootbox.alert('Пароль не верен!');
                                }
                            });
                        }
                    }
                });
            }
        }

    }).mount('#app');

})