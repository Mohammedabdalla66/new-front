import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Menu, Transition } from "@headlessui/react";
import {
  Sun,
  Moon,
  Globe,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu as MenuIcon,
} from "lucide-react";
import {
  toggleTheme,
  setLanguage,
  selectTheme,
  selectLanguage,
} from "../../features/theme/themeSlice";

const Navbar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {t("dashboardTitle")}
          </h1>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Switcher */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === "ar" ? "العربية" : "English"}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-32 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`${
                        active ? "bg-neutral-100 dark:bg-neutral-700" : ""
                      } ${
                        language === "en"
                          ? "text-primary-600 font-medium"
                          : "text-neutral-700 dark:text-neutral-300"
                      } block px-4 py-2 text-sm w-full text-left rtl:text-right`}
                    >
                      English
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleLanguageChange("ar")}
                      className={`${
                        active ? "bg-neutral-100 dark:bg-neutral-700" : ""
                      } ${
                        language === "ar"
                          ? "text-primary-600 font-medium"
                          : "text-neutral-700 dark:text-neutral-300"
                      } block px-4 py-2 text-sm w-full text-left rtl:text-right font-cairo`}
                    >
                      العربية
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label={theme === "light" ? t("darkMode") : t("lightMode")}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>

          {/* Admin Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("admin")}
              </span>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-neutral-100 dark:bg-neutral-700" : ""
                      } flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 w-full text-left rtl:text-right`}
                    >
                      <User className="w-4 h-4" />
                      <span>{t("profile")}</span>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-neutral-100 dark:bg-neutral-700" : ""
                      } flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 w-full text-left rtl:text-right`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>{t("settings")}</span>
                    </button>
                  )}
                </Menu.Item>
                <div className="border-t border-neutral-200 dark:border-neutral-700 my-1" />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-neutral-100 dark:bg-neutral-700" : ""
                      } flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-red-600 dark:text-red-400 w-full text-left rtl:text-right`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t("logout")}</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
