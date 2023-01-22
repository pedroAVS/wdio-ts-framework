import BookingPage from '../pageobjects/booking.page.js'
import data from '../resources/bookingdata.json' assert {type: "json"}
import { BookingConstants } from '../data/constants.js';

describe("Booking Application", () => {
    it('User unable to login if not registered', async () => {
        await BookingPage.open()
        await BookingPage.login(data.invalid.user, data.invalid.password)
        await expect(BookingPage.txtAlert).toHaveTextContaining(
            BookingConstants.LOGIN_FAILED_MSG)
    });

    it('User is able to login with correct credentials', async () => {
        await BookingPage.open()
        await BookingPage.login(data.valid.user, data.valid.password)
        await expect(BookingPage.btnBookAppointment).toBeExisting()
    });

    it('Tokyo CURA booking with hospital readmission booking', async () => {
        await BookingPage.open()
        await BookingPage.tokyoBook(data.date.visit)
        await expect(BookingPage.txtAppointmentSummary).toHaveTextContaining(
            BookingConstants.APPOINTMENT_SUCCESS)
        await expect(BookingPage.txtAppointmentSummary).toHaveTextContaining(
            data.date.visit)
        await expect(BookingPage.txtAppointmentSummary).toHaveTextContaining(
            data.facility.tokyo)
        await BookingPage.logout()
    });

    it('Seoul CURA with medicaid booking', async () => {
        await BookingPage.open()
        await BookingPage.login(data.valid.user, data.valid.password)
        await BookingPage.seoulBook(data.date.visit, data.facility.seoul)
        await expect(BookingPage.txtAppointmentSummary).toHaveTextContaining(
            BookingConstants.APPOINTMENT_SUCCESS)
        await expect(BookingPage.txtAppointmentSummary).toHaveTextContaining(
            data.date.visit)
        await expect(BookingPage.txtAppointmentSummary).toHaveTextContaining(
            data.facility.seoul)
        await BookingPage.logout()
    });
})