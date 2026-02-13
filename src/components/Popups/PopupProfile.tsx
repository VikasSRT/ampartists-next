import { useState, type FormEvent } from "react";
import clsx from "clsx";
import Link from "next/link";
// Components
import CustomSelect from "../CustomSelect/CustomSelect";
import Input from "../Input/Input";
import FileUpload from "../FileUpload/FileUpload";
import DatePicker from "../DatePicker/DatePicker";
import CustomCheckBox from "../CustomCheckbox/CustomCheckBox";
// Images
import Arrow from "../../assets/icons/triangle.svg";
import docs from "../../assets/images/docs.png";
import important from "../../assets/images/important.png";
import performance from "../../assets/images/performance.png";
// Utils
import { GENRE, LOCATIONS, PROFILE_STEPS } from "../../utils/constants";
// Styles
import styles from "./popups.module.css";

type Props = { onClose: () => void };

export default function PopupProfile({ onClose }: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [fileTravel, setFileTravel] = useState<File | null>(null);
  const [fileTechnical1, setFileTechnical1] = useState<File | null>(null);
  const [fileTechnical2, setFileTechnical2] = useState<File | null>(null);
  const [filePasports, setFilePasports] = useState<File | null>(null);
  const [fileProfilePhoto, setFileProfilePhoto] = useState<File | null>(null);
  const [fileCoverPhoto, setFileCoverPhoto] = useState<File | null>(null);
  const [fileMaterials, setFileMaterials] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    crewMembers: [
      {
        name: "",
        role: "",
        location: "",
        nationality: "",
      },
    ],
    lifeShow: "",
    genre: "",
    date: "",
    recordLabel: "",
    rate: "",
    independentArtist: false,
  });

  const activeTitleStep = PROFILE_STEPS.find((item) => item.id === activeStep);

  const handleSetData = (value: string, name: string, index?: number) => {
    if (
      typeof index === "number" &&
      ["name", "role", "location", "nationality"].includes(name)
    ) {
      const updatedMembers = [...formData.crewMembers];
      updatedMembers[index] = {
        ...updatedMembers[index],
        [name]: value,
      };
      setFormData((prev) => ({
        ...prev,
        crewMembers: updatedMembers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddCrewMember = () => {
    setFormData((prev) => ({
      ...prev,
      crewMembers: [
        ...prev.crewMembers,
        {
          name: "",
          role: "",
          location: "",
          nationality: "",
        },
      ],
    }));
  };

  const handleToggleIndependentArtist = () => {
    setFormData((prev) => ({
      ...prev,
      independentArtist: !prev.independentArtist,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  const renderStepForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            {formData.crewMembers.map((member, index) => (
              <fieldset key={index} className={styles.fieldset}>
                <p className={styles.crewSet}>Crew Members {index + 1}</p>
                <div className={styles.inputGroup}>
                  <Input
                    label="Name"
                    name="name"
                    onChange={(value, name) =>
                      handleSetData(value, name, index)
                    }
                    value={member.name}
                    classNameLabel={styles.labelBooking}
                    classNameInput={styles.inputArtist}
                    placeholder="Full Name"
                    className={styles.containerWidthFull}
                  />
                  <Input
                    label="Role"
                    name="role"
                    onChange={(value, name) =>
                      handleSetData(value, name, index)
                    }
                    value={member.role}
                    classNameLabel={styles.labelBooking}
                    classNameInput={styles.inputArtist}
                    placeholder="e.g. Lead Vocalist, Drummer, Manager"
                    className={styles.containerWidthFull}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <CustomSelect
                    label="Location"
                    name="location"
                    onChange={(value, name) =>
                      handleSetData(value, name, index)
                    }
                    options={LOCATIONS}
                    value={member.location}
                    classNameLabel={styles.labelBooking}
                    classNameSelect={styles.selectProfile}
                    placeholder="Select location"
                    className={styles.containerWidthFull}
                    classNameOption={styles.option}
                  />
                  <CustomSelect
                    label="Nationality"
                    name="nationality"
                    onChange={(value, name) =>
                      handleSetData(value, name, index)
                    }
                    options={LOCATIONS}
                    value={member.nationality}
                    classNameLabel={styles.labelBooking}
                    classNameSelect={styles.selectProfile}
                    placeholder="Select Nationality"
                    className={styles.containerWidthFull}
                    classNameOption={styles.option}
                  />
                </div>
              </fieldset>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddCrewMember}
            >
              + Another crew member
            </button>
          </>
        );
      case 1:
        return (
          <>
            <Input
              label="Live Show Format"
              name="lifeShow"
              onChange={handleSetData}
              value={formData.lifeShow}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtistTextArea}
              placeholder="Please describe your available live performance formats (solo/duo/quartet/etc..) "
              className={styles.containerWidthTextArea}
              type="textarea"
              rows={2}
            />
            <CustomSelect
              label="Genre"
              name="genre"
              onChange={handleSetData}
              options={GENRE}
              value={formData.genre}
              classNameLabel={styles.labelBooking}
              classNameSelect={styles.selectProfile}
              placeholder="Select your genre"
              className={styles.containerWidth289}
            />
            <DatePicker
              label="Event Date"
              name="date"
              onChange={handleSetData}
              value={formData.date}
              classNameLabel={styles.labelBooking}
              classNameSelect={styles.selectProfile}
              placeholder="Select date"
              className={styles.containerWidth289}
            />
            <Input
              label="Record Label Name"
              name="recordLabel"
              onChange={handleSetData}
              value={formData.recordLabel}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="Enter Label Name"
              className={styles.containerWidth289}
            />
            <Input
              label="Average Booking Rate (USD)"
              name="rate"
              onChange={handleSetData}
              value={formData.rate}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="0"
              className={styles.containerWidth289}
            />
            <CustomCheckBox
              checked={formData.independentArtist}
              text="Independent Artist"
              onToggle={handleToggleIndependentArtist}
            />
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.flex}>
              <FileUpload
                file={fileTechnical1}
                setFile={setFileTechnical1}
                title="Technical"
              >
                <p className={styles.uploadDescription}>
                  Upload your technical requirements document
                </p>
                <p className={styles.uploadInfo1}>PDF, DOC, DOCX</p>
                <p className={styles.uploadInfo2}>
                  Drag & drop or click to browse
                </p>
              </FileUpload>
              <FileUpload
                file={fileTechnical2}
                setFile={setFileTechnical2}
                title="Technical"
              >
                <p className={styles.uploadDescription}>
                  Upload your technical requirements document
                </p>
                <p className={styles.uploadInfo1}>PDF, DOC, DOCX</p>
                <p className={styles.uploadInfo2}>
                  Drag & drop or click to browse
                </p>
              </FileUpload>
            </div>
            <FileUpload
              file={filePasports}
              setFile={setFilePasports}
              title="Passport scans"
            >
              <p className={styles.uploadDescription}>
                Upload passport scans for all performers (required for
                international bookings)
              </p>
              <p className={styles.uploadInfo1}>PDF, DOC, DOCX</p>
              <p className={styles.uploadInfo2}>
                Drag & drop or click to browse
              </p>
            </FileUpload>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.flex}>
              <FileUpload
                file={fileProfilePhoto}
                setFile={setFileProfilePhoto}
                title="Profile Photos"
                key="Profile Photos"
              >
                <p className={styles.uploadDescription}>
                  Square format for profile
                </p>
                <p className={styles.uploadInfo1}>1000 x 1000 pixels </p>
                <p className={styles.uploadInfo2}>JPG, PNG, WebP - Max 10MB</p>
              </FileUpload>
              <FileUpload
                file={fileCoverPhoto}
                setFile={setFileCoverPhoto}
                title="Cover Photo"
                key="Cover Photo"
              >
                <p className={styles.uploadDescription}>
                  Landscape format for cover
                </p>
                <p className={styles.uploadInfo1}>2000 x 1125 pixels</p>
                <p className={styles.uploadInfo2}>JPG, PNG, WebP - Max 10MB</p>
              </FileUpload>
            </div>
            <FileUpload
              file={fileMaterials}
              setFile={setFileMaterials}
              title="Marketing Materials"
              key="Marketing Materials"
            >
              <p className={styles.uploadDescription}>
                Upload3-5 high-resolution images
              </p>
              <p className={styles.uploadInfo1}>
                For promotional and marketing use
              </p>
              <p className={styles.uploadInfo2}>
                JPG, PNG, WebP - Max 10MB each
              </p>
            </FileUpload>
          </>
        );

      default:
        return null;
    }
  };

  const renderStepAdditionalInfo = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <div className={styles.form}>
              <div className={styles.flex}>
                <img src={docs} alt="icon" className={styles.travelImg} />
                <p className={styles.travelTitle}>Travel Documentation</p>
              </div>
              <FileUpload
                file={fileTravel}
                setFile={setFileTravel}
                title="Upload Travel Documentation"
              >
                <p className={styles.uploadDescription}>
                  Click here to upload all travel documentation for your crew
                  members
                </p>
                <p className={styles.uploadInfo1}>PDF, JPG, PNG, DOC, DOCX</p>
                <p className={styles.uploadInfo2}>
                  Include passports, visas, work permits and other required
                  documents
                </p>
              </FileUpload>
            </div>
            <div className={styles.form}>
              <div className={styles.flex}>
                <img src={important} alt="icon" className={styles.travelImg} />
                <p className={styles.travelTitle}>Important Information</p>
              </div>
              <ul className={styles.fileList}>
                {PROFILE_STEPS[0].information.list1.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className={styles.form}>
              <div className={styles.flex}>
                <img
                  src={performance}
                  alt="icon"
                  className={styles.travelImg}
                />
                <p className={styles.travelTitle}>
                  Performance Information Guidelines
                </p>
              </div>
              <ul className={styles.fileList}>
                {PROFILE_STEPS[1].information.list1.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.formColumn}>
              <div className={styles.flex}>
                <img src={docs} alt="icon" className={styles.travelImg} />
                <p className={styles.travelTitle}>Document Guidelines</p>
              </div>
              <div className={clsx(styles.flex, styles.spaceBetween)}>
                <div>
                  <p className={styles.profileListTitle}>
                    {PROFILE_STEPS[2].information.list1.title}
                  </p>
                  <ul className={styles.fileList}>
                    {PROFILE_STEPS[2].information.list1.items.map((item) => (
                      <li key={item} className={styles.item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={styles.profileListTitle}>
                    {PROFILE_STEPS[2]?.information?.list2?.title}
                  </p>
                  <ul className={styles.fileList}>
                    {PROFILE_STEPS[2]?.information?.list2?.items.map((item) => (
                      <li key={item} className={styles.item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.devider} />
              <p className={clsx(styles.profileListTitle, styles.m0)}>
                Passport Scans
              </p>
              <p className={styles.item}>
                Upload clear, readable scans of passports for all performers.
                This is essential for visa processing and international travel
                arrangements.
              </p>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.formColumn}>
              <div className={styles.flex}>
                <img src={docs} alt="icon" className={styles.travelImg} />
                <p className={styles.travelTitle}>
                  Photo Guidelines & Best Practices
                </p>
              </div>
              <div className={clsx(styles.flex, styles.spaceBetween)}>
                <div>
                  <p className={styles.profileListTitle}>
                    {PROFILE_STEPS[3].information.list1.title}
                  </p>
                  <ul className={styles.fileList}>
                    {PROFILE_STEPS[3].information.list1.items.map((item) => (
                      <li key={item} className={styles.item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={styles.profileListTitle}>
                    {PROFILE_STEPS[3]?.information?.list2?.title}
                  </p>
                  <ul className={styles.fileList}>
                    {PROFILE_STEPS[3]?.information?.list2?.items.map((item) => (
                      <li key={item} className={styles.item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.devider} />

              <div>
                <p className={styles.profileListTitle}>
                  {PROFILE_STEPS[3]?.information?.list3?.title}
                </p>
                <ul className={styles.fileList}>
                  {PROFILE_STEPS[3]?.information?.list3?.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.devider} />

              <p className={styles.item}>
                <span>Pro tip:</span> Great photos significantly increase your
                chances of getting booked. Consider hiring a professional
                photographer for the best results.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={clsx(styles.container, styles.profileContainer)}>
      <p className={styles.title}>Complete Your Profile</p>
      <ul className={styles.stepsList}>
        {PROFILE_STEPS.map(({ id, Icon, title, description }, index) => (
          <li key={id} className={styles.stepsItemProfile}>
            <div
              className={clsx(
                styles.iconContainer,
                activeStep >= index && styles.active,
              )}
            >
              <Icon className={styles.iconSteps} />
            </div>
            <p className={styles.stepTitle}>{title}</p>
            <p className={styles.stepDescription}>{description}</p>
          </li>
        ))}
      </ul>
      <div className={styles.stepContainer}>
        <p className={styles.stepName}>{activeTitleStep?.title}</p>
        <form className={styles.form} onSubmit={handleSubmit} id="profile-form">
          {renderStepForm()}
        </form>
        {renderStepAdditionalInfo()}
        <div
          className={clsx(
            styles.buttonContainer,
            activeStep === 0 && styles.rightPosition,
          )}
        >
          {activeStep > 0 && (
            <button
              type="button"
              className={styles.button}
              onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
              disabled={activeStep === 0}
            >
              <Arrow className={styles.buttonPrevIcon} />
              <span>Previous</span>
            </button>
          )}

          <div className={styles.rightBtnContainer}>
            {activeStep === 3 ? (
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  const form = document.getElementById(
                    "profile-form",
                  ) as HTMLFormElement;
                  form?.requestSubmit();
                }}
              >
                <span>Join AMP</span>
                <Arrow className={styles.buttonNextIcon} />
              </button>
            ) : (
              <button
                type="button"
                className={styles.button}
                onClick={() =>
                  setActiveStep((prev) =>
                    Math.min(prev + 1, PROFILE_STEPS.length - 1),
                  )
                }
              >
                <span>Next</span>
                <Arrow className={styles.buttonNextIcon} />
              </button>
            )}
          </div>
        </div>
        <div>
          <p className={styles.terms}>
            By creating an account, you agree to our 
          </p>
          <p className={styles.terms}>
            <Link href="#" className={styles.linkYellow}>
              Terms of Service
            </Link>
            <span> and </span>
            <Link href="#" className={styles.linkYellow}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
