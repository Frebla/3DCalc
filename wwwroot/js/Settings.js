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
                Password: "",
                PrinterHourCost: 0
            }
        },
        mounted() {
            let self = this;
            $.get(appPath + 'Home/GetSettings', {}, function (response) {
                self.SampleList = response.sampleList;
                self.PlasticList = response.plasticList;
                self.DifficultyList = response.difficultyList;
                self.PrinterHourCost = response.printerHourCost;
                self.Password = response.password;
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
                    DifficultyList: this.DifficultyList,
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