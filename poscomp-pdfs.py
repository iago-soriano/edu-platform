import fitz  # PyMuPDF

# Open the PDF file
pdf_document = fitz.open("caderno_2024.pdf")

# Open a file to save the extracted text
with open("extracted_text.txt", "w", encoding="utf-8") as text_file:

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
            image_filename = f"image_page{page_num + 1}_{img_index}.{image_ext}"

            # Save image to file
            with open(image_filename, "wb") as image_file:
                image_file.write(image_bytes)
            print(f"Saved image: {image_filename}")

"""'
2002 - 2003
2004 - 2005
2006 - 2007
2008
2009
2010 
2011 - 2014
2015 - 2024
"""
