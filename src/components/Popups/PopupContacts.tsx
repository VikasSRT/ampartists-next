import { useState, type FormEvent } from "react";
import styles from "./popups.module.css";
import Input from "../Input/Input";
import CustomSelect from "../CustomSelect/CustomSelect";
import { SUBJECT } from "../../utils/constants";
import Button from "../Button/Button";
import { Controller, useForm } from "react-hook-form";
import useApiHook from "../../hooks/useApiHook";

type Props = { onClose: () => void };

export default function PopupContacts({ onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
  });
  const { api } = useApiHook();

  // const hand8

  const onSubmit = async (data) => {
    const { success } = await api({
      endPoint: "",
      method: "POST",
      data: data,
    });
    if (success) {
      onClose();
    }
  };

  //   const handleSetData = (value: string, name: string, index?: number) => {
  //     if (
  //       typeof index === "number" &&
  //       ["name", "role", "location", "nationality"].includes(name)
  //     ) {
  //       const updatedMembers = [...formData.crewMembers];
  //       updatedMembers[index] = {
  //         ...updatedMembers[index],
  //         [name]: value,
  //       };
  //       setFormData((prev) => ({
  //         ...prev,
  //         crewMembers: updatedMembers,
  //       }));
  //     } else {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: value,
  //       }));
  //     }
  //   };
  return (
    <div className={styles.container}>
      <p className={styles.title}>Get in Touch</p>
      <p className={styles.subTitleContact}>
        Have questions about AMP? Want to book an artist or list your venue?
        We'd love to hear from you. Send us a message and we'll respond as soon
        as possible.
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.titleContainer}>
          <p className={styles.titleForm}>Send us a Message</p>
          <p className={styles.subTitleContactForm}>
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <Input
                {...field}
                label="Full name"
                name="name"
                classNameLabel={styles.labelBooking}
                classNameInput={styles.inputArtist}
                placeholder="Enter your full name"
                className={styles.containerWidth}
              />
              <div className={styles.error}>{errors.name?.message}</div>
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <Input
                {...field}
                label="Email Address"
                name="email"
                classNameLabel={styles.labelBooking}
                classNameInput={styles.inputArtist}
                placeholder="Enter your email"
                className={styles.containerWidth}
              />
              <div className={styles.error}>{errors.email?.message}</div>
            </div>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <Input
                {...field}
                label="Phone Number (Optional)"
                name="phone"
                classNameLabel={styles.labelBooking}
                classNameInput={styles.inputArtist}
                placeholder="Enter your phone number"
                className={styles.containerWidth}
              />
              <div className={styles.error}>{errors.phone?.message}</div>
            </div>
          )}
        />

        <Controller
          name="subject"
          control={control}
          rules={{ required: "Subject is required" }}
          render={({ field }) => (
            <div className={styles.containerWidth}>
              <CustomSelect
                {...field}
                label="Subject"
                name="subject"
                options={SUBJECT}
                classNameLabel={styles.labelBooking}
                classNameSelect={styles.inputArtist}
                placeholder="Select duration"
                className={styles.containerWidth}
                classNameOption={styles.option}
              />
              <div className={styles.error}>{errors.subject?.message}</div>
            </div>
          )}
        />

        <Controller
          name="message"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                label="Message"
                name="message"
                classNameLabel={styles.labelBooking}
                classNameInput={styles.selectBookingTextArea}
                placeholder="Tell us how we can help you..."
                className={styles.containerWidthTextArea}
                type="textarea"
                rows={3}
              />
              {errors.message?.message && <div className={styles.error}>{errors.message?.message}</div>}
            </>
          )}
        />

        <Button text="Send Message" className="bookNow" type="submit" />
      </form>
    </div>
  );
}
