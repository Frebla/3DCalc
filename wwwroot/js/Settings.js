$(function () {
    const app = Vue.createApp({
        data() {
            return {
                PlasticList: [],
                PrinterList: [],
                ModelHourCost: 0,
                PrintHourCost: 0,
                selectedType: 1,
                selectedPlastic: 1,
                Password: "",
                PrinterHourCost: 0
            }
        },
        mounted() {
            let self = this;
            $.get(appPath + 'Home/GetSettings', {}, function (response) {
                self.PlasticList = response.plasticList;
                self.PrinterList = response.printerList;
                self.PrintHourCost = response.printHourCost;
                self.Password = response.password;
                self.ModelHourCost = response.modelHourCost
            });
        },
        methods: {
            back() {
                debugger;
                document.location = appPath + 'Home/Calculator';
            },
            saveSettings() {
                bootbox.alert('Save!');
                debugger;
                let dto = {
                    plasticList: this.PlasticList,
                    printerList: this.PrinterList,
                    modelHourCost: this.ModelHourCost,
                    printHourCost: this.PrintHourCost,
                    password: this.Password
                };
                let self = this;
                $.post(appPath + 'Home/SaveSettings', dto, function (response) {
                    document.location = appPath + 'Home/Calculator';
                });
            },
        }

    }).mount('#app');

})