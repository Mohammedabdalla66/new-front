
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import { toast } from "react-toastify";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import { companyRegisterSchema } from "../../utils/validationSchemas";
import { authAPI } from "../../services/api";
import FileUploadArea from "../common/FileUploadArea";

const SERVICE_PROVIDER_TYPES = [
  { value: "", label: "اختر قطاع النشاط التجاري" },
  { value: "commercial_activities", label: "الأنشطة التجارية" },
  { value: "financial_sector", label: "القطاع المالي" },
  { value: "industrial_sector", label: "القطاع الصناعي" },
  { value: "oil_gas_sector", label: "قطاع النفط والغاز" },
  { value: "tourism_sector", label: "القطاع السياحي" },
  { value: "service_sector", label: "القطاع الخدمي" },
  { value: "construction_sector", label: "البناء والإنشاءات" },
  { value: "retail_sector", label: "قطاع التجزئة" },
  { value: "telecommunications_it", label: "الاتصالات وتقنية المعلومات" },
  { value: "education_sector", label: "التعليم" },
  { value: "public_sector", label: "قطاع عام" },
];

const LEGAL_FORMS = [
  { value: "", label: "اختر الشكل القانوني للشركة" },
  { value: "individual_trader", label: "تاجر فرد" },
  { value: "sole_partner", label: "الشريك الواحد" },
  { value: "limited_liability", label: "محدودية المسؤولية" },
  { value: "public_company", label: "مساهمة عامة" },
  { value: "closed_company", label: "مساهمة مغلقة" },
  { value: "limited_partnership", label: "توصية" },
  { value: "solidarity_company", label: "تضامنية" },

];

const ServiceProviderRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verificationSent, setVerificationSent] = useState(false);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(companyRegisterSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const termsAccepted = watch("termsAccepted");

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setValue("phoneNumber", value);
    setVerified(false);
  };

  const onSendCode = async () => {
    if (!phoneNumber) {
      toast.error("Enter phone number first");
      return;
    }
    try {
      const response = await authAPI.sendPhoneCode(
        phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`
      );
      setVerificationSent(true);

      // Handle skipped verification (Twilio not configured or trial account)
      if (response.data?.skipped) {
        setVerified(true); // Auto-verify if skipped
        toast.warning(
          response.data?.message ||
            "Phone verification skipped (service not configured)"
        );
      } else {
        toast.success("Verification code sent");
      }
    } catch (e) {
      // If error but response indicates skip, allow it
      if (e?.response?.data?.skipped) {
        setVerified(true);

        toast.warning(e.response.data.message || "Phone verification skipped");
      } else {
        toast.error(e?.response?.data?.message || "Failed to send code");
      }
    }
  };

  const onVerifyCode = async () => {
    if (!code) {

      toast.error("Enter the verification code");
      return;
    }
    setVerifying(true);
    try {

      const res = await authAPI.verifyPhoneCode(
        phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`,
        code
      );
      if (res.data?.verified || res.data?.skipped) {
        setVerified(true);
        if (res.data?.skipped) {
          toast.warning("Phone verification skipped (service not configured)");
        } else {
          toast.success("Phone verified");
        }
      } else {
        setVerified(false);
        toast.error("Invalid code");
      }
    } catch (e) {
      // If error but response indicates skip, allow it
      if (e?.response?.data?.skipped) {
        setVerified(true);

        toast.warning("Phone verification skipped");
      } else {
        setVerified(false);
        toast.error(e?.response?.data?.message || "Verification failed");
      }
    } finally {
      setVerifying(false);
    }
  };

  const handleFilesSelected = (files) => {
    setUploadedFiles(files);
  };

  const onSubmit = async (data) => {
    if (!verified) {

      toast.error("Please verify your phone number before submitting");
      return;
    }
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one document");

      return;
    }

    setLoading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append required fields (matching backend expectations)
      // Support both new (serviceProviderName) and old (companyName) field names for backward compatibility
      formData.append("serviceProviderName", data.companyName);
      formData.append("serviceProviderEmail", data.companyEmail);
      // Also append legacy fields for backward compatibility
      formData.append("companyName", data.companyName);
      formData.append("companyEmail", data.companyEmail);
      formData.append("password", data.password);
      formData.append(
        "phoneNumber",
        phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`
      );

      // Append optional fields if they exist
      if (data.commercialRegistrationNumber) {
        formData.append("taxId", data.commercialRegistrationNumber);
      }
      if (data.taxNumber) {
        formData.append("licenseNumber", data.taxNumber);
      }
      if (data.city && data.street && data.zipCode) {
        formData.append(
          "address",
          `${data.street}, ${data.city}, ${data.zipCode}`
        );
      }
      if (data.contactPersonName) {
        formData.append("contactPersonName", data.contactPersonName);
      }
      if (data.companyType) {
        formData.append("companyType", data.companyType);
      }
      if (data.legalForm) {
        formData.append("legalForm", data.legalForm);
      }

      // Append files - MUST use 'documents' as field name (matches backend multer config)
      uploadedFiles.forEach((file) => {
        formData.append("documents", file); // Field name must match: upload.array('documents')
      });

      // Add verification status
      formData.append("verified", "true");

      // Log FormData for debugging (in development only)
      if (process.env.NODE_ENV === "development") {
        console.log("FormData entries:");
        for (let pair of formData.entries()) {
          if (pair[1] instanceof File) {
            console.log(
              `${pair[0]}: [File] ${pair[1].name} (${pair[1].size} bytes)`
            );

          } else {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        }
      }

      console.log("Sending service provider registration request...");
      const response = await authAPI.registerServiceProvider(formData);

      console.log("Registration response:", response.data);

      // Store tokens and user if provided
      if (response.data?.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        if (response.data.user) {
          localStorage.setItem("authUser", JSON.stringify(response.data.user));
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }

      // Get user role from response
      const userRole =
        response.data?.user?.role || response.data?.role || "serviceProvider";

      toast.success("Service Provider registration successful! Redirecting...");
      setTimeout(() => {
        // Redirect service provider to browse projects page
        navigate("/dashboard/browse");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Error response:", error.response?.data);

      const errorData = error.response?.data || {};
      const message =
        errorData.message ||
        errorData.errors?.join(", ") ||
        error.message ||
        "Registration failed. Please try again.";

      toast.error(message);

      // Show additional error details in console for debugging
      if (errorData.error) {
        console.error("Error type:", errorData.error);
      }
      if (errorData.details) {
        console.error("Error details:", errorData.details);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Create Your Service Provider Account
        </h3>
        <p className="text-sm text-gray-600">
          Fill in your service provider information to get started
        </p>
      </div>

      {/* Service Provider Name */}
      <div>
        <label className="form-label">Service Provider Name *</label>
        <input
          type="text"

          {...register("companyName")}
          className="form-input"
          placeholder="Enter your service provider name"
        />
        {errors.companyName && (
          <p className="form-error">{errors.companyName.message}</p>
        )}
      </div>

      {/* Commercial Registration Number */}
      <div>
        <label className="form-label">Commercial Registration Number *</label>
        <input
          type="text"

          {...register("commercialRegistrationNumber")}
          className="form-input"
          placeholder="Enter registration number"
        />
        {errors.commercialRegistrationNumber && (

          <p className="form-error">
            {errors.commercialRegistrationNumber.message}
          </p>
        )}
      </div>

      {/* Tax Number */}
      <div>
        <label className="form-label">Tax Number</label>
        <input
          type="text"

          {...register("taxNumber")}
          className="form-input"
          placeholder="Enter tax number (optional)"
        />
        {errors.taxNumber && (
          <p className="form-error">{errors.taxNumber.message}</p>
        )}
      </div>

      {/* Service Provider Email */}
      <div>
        <label className="form-label">Service Provider Email *</label>
        <input
          type="email"
          {...register("companyEmail")}
          className="form-input"
          placeholder="Enter service provider email address"
        />
        {errors.companyEmail && (
          <p className="form-error">{errors.companyEmail.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="form-label">Phone Number *</label>
        <PhoneInput
          defaultCountry="om"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="w-full"
        />
        {errors.phoneNumber && (
          <p className="form-error">{errors.phoneNumber.message}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onSendCode}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Send Code
          </button>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 form-input"
          />
          <button
            type="button"
            disabled={verifying}
            onClick={onVerifyCode}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            {verifying ? "Verifying..." : "Verify"}
          </button>
          {verified && <span className="text-blue-600 text-sm">Verified</span>}
        </div>
      </div>

      {/* Contact Person Name */}
      <div>
        <label className="form-label">Contact Person Name *</label>
        <input
          type="text"
          {...register("contactPersonName")}
          className="form-input"
          placeholder="Enter contact person full name"
        />
        {errors.contactPersonName && (
          <p className="form-error">{errors.contactPersonName.message}</p>
        )}
      </div>

      {/* Service Provider Type */}
      <div>
        <label className="form-label">Service Provider Type *</label>
        <select {...register("companyType")} className="form-input">
          {SERVICE_PROVIDER_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.companyType && (
          <p className="form-error">{errors.companyType.message}</p>
        )}
      </div>

      {/* Legal Form */}
      {/* <div>
        <label className="form-label">Service Provider Legal Form*</label>
        <select {...register("legalForm")} className="form-input">
          {LEGAL_FORMS.map((form) => (
            <option key={form.value} value={form.value}>
              {form.label}
            </option>
          ))}
        </select>
        {errors.legalForm && (
          <p className="form-error">{errors.legalForm.message}</p>
        )}
      </div> */}

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="form-label">City *</label>
          <input
            type="text"
            {...register("city")}
            className="form-input"
            placeholder="City"
          />
          {errors.city && <p className="form-error">{errors.city.message}</p>}
        </div>
        <div>
          <label className="form-label">Street *</label>
          <input
            type="text"
            {...register("street")}
            className="form-input"
            placeholder="Street"
          />
          {errors.street && (
            <p className="form-error">{errors.street.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">Postal Code*</label>
          <input
            type="text"
            {...register("zipCode")}
            className="form-input"
            placeholder="Postal Code"
          />
          {errors.zipCode && (
            <p className="form-error">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="form-input pr-10"
              placeholder="Create password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="form-input pr-10"
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="form-label">Service Provider Documents *</label>
        <FileUploadArea
          onFilesSelected={handleFilesSelected}
          maxFiles={5}
          maxSize={5 * 1024 * 1024} // 5MB
          acceptedTypes={[".pdf", ".doc", ".docx", ".jpg", ".jpeg"]}
        />
        <p className="mt-2 text-xs text-gray-500">
          Upload your license and official documents (PDF, DOCX, JPG - Max 5MB
          each)
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            {...register("termsAccepted")}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="text-gray-700">
            I accept the{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy
            </a>
          </label>
        </div>
      </div>
      {errors.termsAccepted && (
        <p className="form-error">{errors.termsAccepted.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !termsAccepted}
        className="btn-primary"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Creating Account...
          </div>
        ) : (
          "Create Service Provider Account"
        )}
      </button>
    </form>
  );
};

export default ServiceProviderRegisterForm;
