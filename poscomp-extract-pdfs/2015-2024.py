import fitz  # PyMuPDF

year = 2024
# Open the PDF file
pdf_document = fitz.open(f"caderno_{year}.pdf")

# Open a file to save the extracted text
with open(f"{year}_test.txt", "w", encoding="utf-8") as text_file:

    # Extract text and images from each page
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)

        # Extract text
        text = page.get_text()
        text_file.write(text)
        print(f"Text on page {page_num + 1} saved.")

        # Extract images, except those on the first page
        if page_num == 0:
            continue
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image_filename = f"{year}image_page{page_num + 1}_{img_index}.{image_ext}"

            # Save image to file
            with open(image_filename, "wb") as image_file:
                image_file.write(image_bytes)
            print(f"Saved image: {image_filename}")


pdf_document.close()

# Process the answer key PDF (gabarito_{year}.pdf)
gabarito_document = fitz.open(f"gabarito_{year}.pdf")

# Open a file to save the extracted text from gabarito
with open(f"gabarito_{year}.txt", "w", encoding="utf-8") as gabarito_file:
    for page_num in range(len(gabarito_document)):
        page = gabarito_document.load_page(page_num)

        # Extract text
        text = page.get_text()
        gabarito_file.write(text)
        print(f"Text on page {page_num + 1} of gabarito_{year}.pdf saved.")

gabarito_document.close()