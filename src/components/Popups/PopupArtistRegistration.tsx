import { useState, type FormEvent } from "react";
import clsx from "clsx";
import Link from "next/link";
// Components
import Input from "../Input/Input";
import FileUpload from "../FileUpload/FileUpload";
// Utils
import { ARTIST_REGISTRATION_STEPS } from "../../utils/constants";
// Images
import Arrow from "../../assets/icons/triangle.svg";
// Styles
import styles from "./popups.module.css";

type Props = { onClose: () => void };

export default function PopupArtistRegistration({ onClose }: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    stageName: "",
    personName: "",
    email: "",
    location: "",
    phone: "",
    instagram: "",
    facebook: "",
    snapchat: "",
    tikTok: "",
    spotify: "",
    soundCloud: "",
    youTube: "",
  });

  const activeTitleStep = ARTIST_REGISTRATION_STEPS.find(
    (item) => item.id === activeStep,
  );

  const handleFilterChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
            <Input
              label="Artist/Stage Name"
              name="stageName"
              onChange={handleFilterChange}
              value={formData.stageName}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="What should we call you?"
              className={styles.containerWidth}
            />
            <Input
              label="Contact Person Name"
              name="personName"
              onChange={handleFilterChange}
              value={formData.personName}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="Your real name"
              className={styles.containerWidth}
            />
            <Input
              label="Email Address"
              name="email"
              onChange={handleFilterChange}
              value={formData.email}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="your@email.com"
              className={styles.containerWidth}
            />
            <Input
              label="Location"
              name="location"
              onChange={handleFilterChange}
              value={formData.location}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="Where are you based?"
              className={styles.containerWidth}
            />
            <Input
              label="Phone Number with Country Code"
              name="phone"
              onChange={handleFilterChange}
              value={formData.phone}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtistTextArea}
              placeholder="+1 555 123 4567"
              className={styles.containerWidthTextArea}
              type="textarea"
              rows={1}
            />
          </>
        );
      case 1:
        return (
          <>
            <Input
              label="Instagram"
              name="instagram"
              onChange={handleFilterChange}
              value={formData.instagram}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="Instagram"
              className={styles.containerWidth}
            />
            <Input
              label="Facebook"
              name="facebook"
              onChange={handleFilterChange}
              value={formData.facebook}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="Facebook"
              className={styles.containerWidth}
            />
            <Input
              label="Snapchat"
              name="snapchat"
              onChange={handleFilterChange}
              value={formData.snapchat}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="Snapchat"
              className={styles.containerWidth}
            />
            <Input
              label="TikTok"
              name="tikTok"
              onChange={handleFilterChange}
              value={formData.tikTok}
              classNameLabel={styles.labelBooking}
              classNameInput={styles.inputArtist}
              placeholder="TikTok"
              className={styles.containerWidth}
            />
            <div className={styles.trippleContainer}>
              <Input
                label="Spotify"
                name="spotify"
                onChange={handleFilterChange}
                value={formData.spotify}
                classNameLabel={styles.labelBooking}
                classNameInput={styles.inputArtist}
                placeholder="URL or spotify artist"
                className={styles.containerWidth33}
              />
              <Input
                label="SoundCloud"
                name="soundCloud"
                onChange={handleFilterChange}
                value={formData.soundCloud}
                classNameLabel={styles.labelBooking}
                classNameInput={styles.inputArtist}
                placeholder="URL of profile"
                className={styles.containerWidth33}
              />
              <Input
                label="YouTube"
                name="youTube"
                onChange={handleFilterChange}
                value={formData.youTube}
                classNameLabel={styles.labelBooking}
                classNameInput={styles.inputArtist}
                placeholder="URL of channel "
                className={styles.containerWidth33}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <FileUpload file={file} setFile={setFile}>
              <p className={styles.subTitle}>
                PDF, DOC, or DOCX files up to 10MB
              </p>
            </FileUpload>
            <div className={styles.fileListContainer}>
              <p className={styles.fileListTitle}>
                What to include in your EPK:
              </p>
              <ul className={styles.fileList}>
                <li className={styles.item}>
                  Professional bio and artist statement
                </li>
                <li className={styles.item}>High-quality promotional photos</li>
                <li className={styles.item}>
                  Music samples or streaming links
                </li>
                <li className={styles.item}>Press coverage and reviews</li>
                <li className={styles.item}>
                  Performance videos or live footage
                </li>
                <li className={styles.item}>
                  Contact information and social media links
                </li>
                <li className={styles.item}>
                  Technical rider and performance requirements
                </li>
              </ul>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Join AMP</p>
      <ul className={styles.stepsList}>
        {ARTIST_REGISTRATION_STEPS.map(
          ({ id, Icon, title, description }, index) => (
            <li key={id} className={styles.stepsItem}>
              <div
                className={clsx(
                  styles.iconContainer,
                  activeStep >= index && styles.active,
                )}
              >
                <Icon className={styles.iconSteps} />
              </div>
              <p className={styles.stepTitle}>{title}</p>
              <p className={styles.stepDescriptionReg}>{description}</p>
            </li>
          ),
        )}
      </ul>
      <div className={styles.stepContainer}>
        <p className={styles.stepName}>{activeTitleStep?.title}</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          id="artist-registration-form"
        >
          {renderStepForm()}
        </form>
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
            {activeStep === 1 && (
              <button
                type="button"
                className={styles.button}
                onClick={() =>
                  setActiveStep((prev) =>
                    Math.min(prev + 1, ARTIST_REGISTRATION_STEPS.length - 1),
                  )
                }
              >
                Skip
              </button>
            )}
            {activeStep === 2 ? (
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  const form = document.getElementById(
                    "artist-registration-form",
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
                    Math.min(prev + 1, ARTIST_REGISTRATION_STEPS.length - 1),
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
