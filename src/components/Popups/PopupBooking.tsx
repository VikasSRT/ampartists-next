import { useEffect, useState } from "react";
// Components
import Button from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import Input from "../Input/Input";
// Utils
import { Controller, useForm } from "react-hook-form";
import type { ICheckbox } from "../../types/types";

// Images
import Attendents from "../../assets/icons/attendents.svg";
import Budget from "../../assets/icons/budget.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Clock from "../../assets/icons/clock.svg";
import Location from "../../assets/icons/location.svg";
// Styles
import useApiHook from "../../hooks/useApiHook";
import { formatNumber, getCookie } from "../../utils/utils";
import CustSelect from "../CustomSelect/CustSelect";
import styles from "./popups.module.css";
import { useTranslation } from "react-i18next";

type Props = { onClose: () => void; id?: string };

const EVENT_TYPE = [
  { label: "Private Event", value: "private_event" },
  { label: "Wedding", value: "wedding" },
  { label: "Corporate Events", value: "corporate_events" },
  { label: "Festival / Concert", value: "festival_concert" },
  { label: "Conference", value: "conference" },
  { label: "Bar / Club", value: "bar_club" },
  {
    label: "Advertising / Influencer Marketing",
    value: "advertising_influencer_marketing",
  },
  { label: "Special Appearance", value: "special_appearance" },
];

function PopupBooking({ onClose, id, artistInfo }: Props) {
  const { api } = useApiHook();
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      type: "",
      date: "",
      attendees: "",
      duration: "",
      budget: "",
      location: "",
      information: "",
    },
    mode: "onChange",
  });

  const allValues = watch();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = (value: string | ICheckbox[], name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (formData: any) => {
    const form = new FormData();
    if (formData.information)
      form.append("additional_info", formData.information);
    if (formData.budget) form.append("budget", formData.budget);
    if (formData.location) form.append("location", formData.location);
    if (formData.duration)
      form.append("performance_duration", formData.duration);
    if (formData.attendees)
      form.append("number_of_attendees", formData.attendees);
    if (formData.type) form.append("event_type", formData.type);
    if (formData.date)
      form.append(
        "event_date",
        new Date(formData.date)?.toLocaleDateString("en-CA"),
      );
    form.append("artist_id", id);

    const response = await api({
      endPoint: `customer/artist-booking-request/`,
      method: "POST",
      data: form,
      showErrorToast: true,
      showToastMessage: true,
    });
    if (response?.success) {
      onClose();
      window.location.href = `${process.env.NEXT_PUBLIC_MAIN_APP_URL}`;
    } else {
      setError(response?.data?.error);
    }
  };

  useEffect(() => {
    const accessToken = getCookie("access_token");

    if (!accessToken)
      window.location.href = `${process.env.NEXT_PUBLIC_MAIN_APP_URL}/signin`;
    else setShowModal(true);
  }, []);

  if (!showModal) {
    return;
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Book {artistInfo?.stage_name}</p>
      <p className={styles.subTitle}>
        Fill out the form below to request a booking.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Event type is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <CustSelect
                {...field}
                label="Event Type"
                options={EVENT_TYPE}
                placeholder="Select event type"
                classNameLabel={styles.labelBooking}
                classNameSelect={styles.selectBooking}
                classNameOption={styles.option}
                error={errors.type?.message}
              />
              <div className={styles.error}>{errors.type?.message}</div>
            </div>
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: "Event date is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <DatePicker
                {...field}
                label="Event Date"
                placeholder="Select date"
                icon={<Calendar className={styles.icon} />}
                classNameLabel={styles.labelBooking}
                classNameSelect={styles.selectBooking}
                className={styles.containerWidth}
                blockedDates={(artistInfo?.blocked_dates || [])?.map(
                  ({ date }: { date: string }) => date,
                )}
              />
              <div className={styles.error}>{errors.date?.message}</div>
            </div>
          )}
        />

        <Controller
          name="attendees"
          control={control}
          rules={{
            required: "Number of attendees is required",
            min: { value: 1, message: "Must be at least 1" },
          }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <Input
                {...field}
                label="Number of Attendees"
                type="number"
                placeholder="Estimated guests"
                icon={<Attendents className={styles.icon} />}
                classNameLabel={styles.labelBooking}
                classNameInput={styles.selectBooking}
                className={styles.containerWidth}
                error={errors.attendees?.message}
              />
              <div className={styles.error}>{errors.attendees?.message}</div>
            </div>
          )}
        />

        <Controller
          name="duration"
          control={control}
          rules={{ required: "Duration is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <CustSelect
                {...field}
                label="Performance Duration"
                options={[
                  { label: "1 hour", value: "one_hour" },
                  { label: "2 hours", value: "two_hours" },
                  { label: "3 hours", value: "three_hours" },
                  { label: "4 hours", value: "four_hours" },
                  { label: "Custom", value: "custom" },
                ]}
                placeholder="Select duration"
                icon={<Clock className={styles.icon} />}
                classNameLabel={styles.labelBooking}
                classNameSelect={styles.selectBooking}
                className={styles.containerWidth}
                classNameOption={styles.option}
                error={errors.duration?.message}
              />
              <div className={styles.error}>{errors.attendees?.message}</div>
            </div>
          )}
        />

        <Controller
          name="location"
          control={control}
          rules={{ required: "Location is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <CustSelect
                {...field}
                label="Location"
                options={[
                  { label: "Dubai", value: "dubai" },
                  { label: "Abu Dhabi", value: "abu_dhabi" },
                  { label: "Sharjah", value: "sharjah" },
                  { label: "Riyadh", value: "riyadh" },
                  { label: "Jeddah", value: "jeddah" },
                  { label: "Qatar", value: "qatar" },
                  { label: "Cairo", value: "cairo" },
                  { label: "Other", value: "other" },
                ]}
                placeholder="Select location"
                icon={<Location className={styles.icon} />}
                classNameLabel={styles.labelBooking}
                classNameSelect={styles.selectBooking}
                className={styles.containerWidth}
                classNameOption={styles.option}
                error={errors.location?.message}
              />
              <div className={styles.error}>{errors.location?.message}</div>
            </div>
          )}
        />

        <Controller
          name="budget"
          control={control}
          rules={{
            required: "Budget is required",
            validate: (value) => {
              const bookingFee = artistInfo?.pricing_matrix?.find(
                ({ event_type, location, fee_type }) =>
                  allValues?.type === event_type &&
                  allValues?.location === location &&
                  fee_type === "booking_fee",
              );

              const hospitalityFee = artistInfo?.pricing_matrix?.find(
                ({ event_type, location, fee_type }) =>
                  allValues?.type === event_type &&
                  allValues?.location === location &&
                  fee_type === "hospitality_fee",
              );

              if (hospitalityFee && bookingFee) {
                return (
                  parseFloat(value) >
                    Number(hospitalityFee?.min_price) +
                      Number(bookingFee?.min_price) ||
                  `For an event like yours, customers typically budget between $${formatNumber(
                    Number(hospitalityFee?.min_price) +
                      Number(bookingFee?.min_price),
                  )} and $${formatNumber(
                    (Number(hospitalityFee?.min_price) +
                      Number(bookingFee?.min_price)) *
                      1.5,
                  )}.`
                );
              } else {
                // return (
                //   parseFloat(value) >
                //     Number(artistInfo?.average_booking_rate) ||
                //   `An event like yours typically costs between $${Number(
                //     artistInfo?.average_booking_rate
                //   )} and $${Number(artistInfo?.average_booking_rate) * 1.5}.`
                // );
                return;
              }
            },
          }}
          render={({ field }) => (
            <div
              className={styles.containerWidth}
              style={{
                width: "calc(50% - 7px)",
              }}
            >
              <Input
                {...field}
                label="Your Budget (USD)"
                type="number"
                placeholder="Your budget"
                icon={<Budget className={styles.icon} />}
                classNameLabel={styles.labelBooking}
                classNameInput={styles.selectBooking}
                className={styles.containerWidth}
                infoBtn
                error={errors.budget?.message}
              />
              <div className={styles.error}>{errors.budget?.message}</div>
            </div>
          )}
        />

        <Controller
          name="information"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Additional Information"
              type="textarea"
              placeholder="Any special requests or details about your event"
              classNameLabel={styles.labelBooking}
              classNameInput={styles.selectBookingTextArea}
              className={styles.containerWidthTextArea}
            />
          )}
        />
        <div className={styles.error}>{error}</div>

        <Button text={t("bookNow")} className="bookNow" type="submit" />
      </form>
    </div>
  );
}

export default PopupBooking;
