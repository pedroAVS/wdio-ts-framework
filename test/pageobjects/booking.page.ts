import data from '../resources/bookingdata.json' assert {type: "json"}

import Page from './page.js';

class BookingPage extends Page {

    public get inputUsername () {
        return $('#txt-username');
    }

    public get inputPassword () {
        return $('#txt-password');
    }

    public get btnLogin () {
        return $('button[type="submit"]')
    }

    public get btnMakeAppointment () {
        return $('a[id="btn-make-appointment"]');
    }

    public get btnBookAppointment () {
        return $('button[id="btn-book-appointment"]')
    }

    public get txtAlert () {
        return $('.lead.text-danger')
    }

    public get btnHospitalReadmission () {
        return $('#chk_hospotal_readmission')
    }

    public get btnMedicaidProgram () {
        return $('#radio_program_medicaid')
    }

    public get inputVisitDate () {
        return $('#txt_visit_date')
    }

    public get dropdownFacilities () {
        return $('#combo_facility')
    }

    public get txtAppointmentSummary () {
        return $('#summary')
    }

    public get menuToggle () {
        return $('a[id="menu-toggle"]')
    }

    public get btnLogout () {
        return $('a[href="authenticate.php?logout"]')
    }

    public async logout (){
        await this.menuToggle.click()
        await this.btnLogout.click()
    }

    public async tokyoBook (date: string) {
        await this.btnHospitalReadmission.click();
        await this.inputVisitDate.setValue(date)
        await this.btnBookAppointment.click()
    }

    public async seoulBook (date:string, facility: string) {
        await this.dropdownFacilities.selectByVisibleText(facility)
        await this.btnMedicaidProgram.click()
        await this.inputVisitDate.setValue(date)
        await this.btnBookAppointment.click()
    }

    public async login (username: string, password: string) {
        await this.btnMakeAppointment.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    public open () {
        return super.open(data.url.domain, data.url.subDirectory);
    }
}

export default new BookingPage();