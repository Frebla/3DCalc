$(function () {
    const app = Vue.createApp({
        data() {
            return {
                SampleList: [],
                PlasticList: [],
                DifficultyList: [],
                selectedType: 1,
                selectedPlastic: 1,
                difficult: 1,
                sizeL: 18,
                sizeW: 0,
                sizeD: 0,
                weightOne: 0,
                quantity: 1,
                totalAll: "0",
                totalOne: "0"
            }
        },
        mounted() {
            let self = this;
            $.get(appPath + 'Home/GetSettings', {}, function (response) {
                debugger;
                self.SampleList = response.sampleList;
                self.PlasticList = response.plasticList;
                self.DifficultyList = response.difficultyList;
            });
        },
        methods: {
            calculate() {
                let dto = {
                    type: this.selectedType,
                    plastic: this.selectedPlastic,
                    difficult: this.difficult,
                    sizeL: this.sizeL,
                    sizeW: this.sizeW,
                    sizeD: this.sizeD,
                    weightOne: this.weightOne,
                    quantity: this.quantity
                };
                let self = this;
                $.get(appPath + 'Home/Calculate', dto, function (response) {
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