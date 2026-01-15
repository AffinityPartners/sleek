#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "google-genai",
#     "pillow",
# ]
# ///
"""
Edit SLEEK toothbrush images with marketing effects using Gemini image editing.
Generates 6 feature images with white backgrounds for the Cutting-Edge Toothbrush Features section.
"""

import os
import sys
from pathlib import Path

from google import genai
from PIL import Image
import io
import base64


def edit_image(client, image_path: str, edit_prompt: str, output_path: str) -> bool:
    """
    Edit an image using Gemini's image generation capabilities.
    Takes the source image, applies the edit prompt, and saves to output path.
    
    Returns True if successful, False otherwise.
    """
    try:
        # Load the source image using PIL
        source_img = Image.open(image_path)
        
        # Create the edit request with image + text prompt
        # Using gemini-2.0-flash-exp-image-generation for image editing
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[source_img, edit_prompt],
            config={
                "response_modalities": ["image", "text"],
            }
        )
        
        # Extract and save the edited image
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data is not None:
                image_bytes = part.inline_data.data
                if isinstance(image_bytes, str):
                    image_bytes = base64.b64decode(image_bytes)
                img = Image.open(io.BytesIO(image_bytes))
                
                # Ensure output directory exists
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                img.save(output_path)
                print(f"✅ Saved: {output_path}")
                return True
        
        print(f"❌ No image generated for: {output_path}")
        return False
    except Exception as e:
        print(f"❌ Error processing {output_path}: {e}")
        return False


def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set", file=sys.stderr)
        sys.exit(1)
    
    client = genai.Client(api_key=api_key)
    
    # Base paths
    project_root = Path("/Volumes/ssd/Websites/sleek")
    source_brush = project_root / "public/images/products/sleek-brush-front.png"
    source_kit = project_root / "public/images/SleekKit.png"
    output_dir = project_root / "public/images/features"
    
    # Feature image configurations: (source, output_name, edit_prompt)
    features = [
        (
            source_brush,
            "cleaning-modes.png",
            "Keep this exact SLEEK toothbrush but add dramatic teal/cyan LED glow effects to the 5 mode indicators (Clean, Soft, Whiten, Massage, Deep Clean) on the handle. Make it look like they are illuminated. Clean WHITE background with soft professional product photography lighting. Keep the toothbrush exactly as it is with all text labels visible, just add the glowing indicator effects. White background represents cleanliness."
        ),
        (
            source_brush,
            "sonic-technology.png",
            "Keep this exact SLEEK toothbrush but add dynamic sonic wave visualization effects emanating from the brush head. Add circular teal/cyan sonic wave rings radiating outward from the bristles to show high-frequency vibration. Clean WHITE background with soft professional lighting. Preserve the exact toothbrush design with SLEEK logo and all mode labels. White background for clean dental aesthetic."
        ),
        (
            source_brush,
            "usb-rechargeable.png",
            "Keep this exact SLEEK toothbrush but show it laying down with a USB charging cable connected to the base. Add a subtle teal/cyan charging indicator light glow. Clean WHITE background with soft professional product photography lighting. Show the convenience of USB charging. Preserve the exact toothbrush design with SLEEK logo. White background for clean modern look."
        ),
        (
            source_brush,
            "water-resistant.png",
            "Keep this exact SLEEK toothbrush but add water droplets and splash effects around it to demonstrate water resistance. Crystal clear water drops on the matte black surface. Teal/cyan accent lighting reflecting off water. Clean WHITE background like a bright modern bathroom. Preserve the exact toothbrush design with SLEEK logo and all text. White background for fresh clean feeling."
        ),
        (
            source_brush,
            "smart-timer.png",
            "Keep this exact SLEEK toothbrush and add a glowing digital 2:00 timer display above it with a circular teal/cyan timer progress arc. Show smart timer technology concept. Clean WHITE background with soft professional lighting. Preserve the exact toothbrush design with SLEEK logo and all mode labels visible. White background for clean dental aesthetic."
        ),
        (
            source_kit,
            "complete-kit.png",
            "Enhance this SLEEK dental kit image with premium lighting on a clean WHITE background. Add subtle teal/cyan accent lighting and glow effects. Make it look like a premium unboxing experience. Keep all the kit components exactly as they are (toothbrush, travel case, box with SLEEK logo). Professional product photography style with bright white background for clean dental marketing aesthetic."
        ),
    ]
    
    print(f"Generating {len(features)} feature images with white backgrounds...")
    print()
    
    success_count = 0
    for source, output_name, prompt in features:
        output_path = output_dir / output_name
        print(f"Processing: {output_name}")
        if edit_image(client, str(source), prompt, str(output_path)):
            success_count += 1
        print()
    
    print(f"Completed: {success_count}/{len(features)} images generated successfully")


if __name__ == "__main__":
    main()
