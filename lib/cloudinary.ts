import { v2 as cloudinary } from "cloudinary";

export const UPLOAD_FOLDER_NAME = "jobtailor_resumes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  secure_url: string;
}

export async function uploadPdfToCloudinary(
  fileUri: string,
  userId: string,
): Promise<CloudinaryUploadResult> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      throw new Error(
        "CRITICAL: Cloudinary environment variables are missing.",
      );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
      folder: `${UPLOAD_FOLDER_NAME}/${userId}`,
      resource_type: "auto",
    });

    return {
      public_id: cloudinaryResponse.public_id,
      bytes: cloudinaryResponse.bytes,
      secure_url: cloudinaryResponse.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (response.result !== "ok") {
      throw new Error(`Cloudinary responded with: ${response.result}`);
    }
  } catch (error) {
    console.error(`Failed to delete orphaned file ${publicId}:`, error);
  }
}
