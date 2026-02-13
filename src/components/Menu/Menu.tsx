import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
// Components
import Button from "../Button/Button";
import CustomModal from "../CustomModal/CustomModal";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import Modal from "../Modal/Modal";
import Navpanel from "../NavPanels/Navpanel";
import PopupProfile from "../Popups/PopupProfile";
// Styles
import { getCookie } from "../../utils/utils";
import styles from "./menu.module.css";
import { useTranslation } from "react-i18next";

type Props = {};

export default function Menu({}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);

  const [isDesktopDropdownOpen, setisDesktopDropdownOpen] =
    useState<boolean>(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] =
    useState<boolean>(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleSignup = () => setIsSignupOpen((prev) => !prev);
  const toggleDesktopDropdown = () => setisDesktopDropdownOpen((prev) => !prev);
  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen((prev) => !prev);
    // Prevent modal from closing when opening dropdown
    if (!isMobileDropdownOpen) {
      setIsOpen(true);
    }
  };

  const token = getCookie("access_token");

  // Handle Close on Click Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setisDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopDropdownRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {/* <LangSwitcher /> */}
        {token ? (
          <a href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/artist-signup`}>
            <Button
              text={t("dashboard")}
              //  onClick={toggleSignup}
            />
          </a>
        ) : (
          <>
            <a
              href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/signin`}
              style={{ fontSize: "16px" }}
            >
              {t("login")}
            </a>

            <div className="relative z-50" ref={desktopDropdownRef}>
              <div onClick={toggleDesktopDropdown} className="cursor-pointer">
                <Button text={t("signup")} fontSize="16px" />
              </div>

              {isDesktopDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-[#1A1A1A] border border-[#333] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  <a
                    href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/artist-signup`}
                    className="group flex flex-col px-5 py-4 border-b border-[#333] hover:bg-[#2a2a2a] transition-colors duration-200"
                  >
                    <span className="font-semibold text-[15px] text-white group-hover:text-[#ccff00] transition-colors">
                      Artist Signup
                    </span>
                    <span className="text-xs text-gray-400 mt-1 leading-snug">
                      Apply to join AMP as an artist
                    </span>
                  </a>

                  <a
                    href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/customer-signup`}
                    className="group flex flex-col px-5 py-4 hover:bg-[#2a2a2a] transition-colors duration-200"
                  >
                    <span className="font-semibold text-[15px] text-white group-hover:text-[#ccff00] transition-colors">
                      Booker Signup
                    </span>
                    <span className="text-xs text-gray-400 mt-1 leading-snug">
                      Sign up to book artists
                    </span>
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className={styles.burgerContainer}>
        <button
          className={styles.burger}
          aria-label="Open menu"
          onClick={toggleMenu}
        >
          <div className={clsx(styles.burgerLine, isOpen && styles.topOpen)} />
          <div
            className={clsx(styles.burgerLine, isOpen && styles.middleOpen)}
          />
          <div
            className={clsx(styles.burgerLine, isOpen && styles.bottomOpen)}
          />
        </button>
      </div>

      <Modal
        onClose={toggleMenu}
        showModal={isOpen}
        className="pt-86"
        key="menu"
      >
        <div className={styles.modalContent}>
          <Navpanel />
          <div className={styles.buttonContainerMobile}>
            <LangSwitcher />
            <a
              href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/signin`}
              className="!text-[16px]"
            >
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                {t("login")}
              </div>
            </a>

            <div
              className="relative z-50 w-full max-w-[300px] mx-auto"
              ref={mobileDropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                onClick={toggleMobileDropdown}
                className="cursor-pointer w-full"
              >
                <Button
                  text={t("signup")}
                  fullWidth
                  className="menu"
                  padding="20px"
                  fontSize="16px"
                />
              </div>
              {isMobileDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-full bg-[#1A1A1A] border border-[#333] rounded-[10px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  <a
                    href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/artist-signup`}
                    className="group flex flex-col px-5 py-6 border-b border-[#333] hover:bg-[#2a2a2a] transition-colors duration-200"
                    onClick={() => {
                      setIsMobileDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    <span className="font-semibold text-[15px] text-white group-hover:text-[#ccff00] transition-colors text-center">
                      Artist Signup
                    </span>
                    <span className="text-[11px] text-gray-400 mt-1 leading-snug text-center">
                      Apply to join AMP as an artist
                    </span>
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/customer-signup`}
                    className="group flex flex-col px-5 py-6 hover:bg-[#2a2a2a] transition-colors duration-200"
                    onClick={() => {
                      setIsMobileDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    <span className="font-semibold text-[15px] text-white group-hover:text-[#ccff00] transition-colors text-center">
                      Booker Signup
                    </span>
                    <span className="text-[11px] text-gray-400 mt-1 leading-snug text-center">
                      Sign up to book artists
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <CustomModal open={isSignupOpen} onClose={toggleSignup}>
        <PopupProfile onClose={toggleSignup} />
      </CustomModal>
    </div>
  );
}
