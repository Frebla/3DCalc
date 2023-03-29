$(function () {
    const app = Vue.createApp({
        data() {
            return {
                SampleList: [],
                PlasticList: [],
                ModelHourCost: 0,
                selectedType: 1,
                selectedPlastic: 1,
                Password: "",
                PrinterHourCost: 0
            }
        },
        mounted() {
            let self = this;
            $.get(appPath + 'Home/GetSettings', {}, function (response) {
                self.SampleList = response.sampleList;
                self.PlasticList = response.plasticList;
                self.PrinterHourCost = response.printerHourCost;
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
                    sampleList: this.SampleList,
                    plasticList: this.PlasticList,
                    modelHourCost: this.ModelHourCost,
                    printerHourCost: this.PrinterHourCost,
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