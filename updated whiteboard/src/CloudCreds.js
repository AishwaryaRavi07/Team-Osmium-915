

'use strict';

async function main(projectId, location, processorId, filePath) {

    const ProjectId = '';
    const Location = ''; 
    const ProcessorId = ''; 
    const FilePath = '';


  const {DocumentProcessorServiceClient} =
    require('@google-cloud/documentai').v1beta3;


  const client = new DocumentProcessorServiceClient();

  async function processDocument() {
    
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // Read the file into memory.
    const fs = require('fs').promises;
    console.log(filePath.type())
    const imageFile = await fs.readFile(filePath);

    // Convert the image data to a Buffer and base64 encode it.
    const encodedImage = Buffer.from(imageFile).toString('base64');

    const request = {
      name,
      rawDocument: {
        content: encodedImage,
        mimeType: 'application/pdf',
      },
    };

    // Recognizes text entities in the PDF document
    const [result] = await client.processDocument(request);

    console.log('Document processing complete.');

    const {document} = result;
    const {text} = document;

    // Read the text recognition output from the processor
    console.log(`Full document text: ${JSON.stringify(text)}`);
    console.log(`There are ${document.pages.length} page(s) in this document.`);
    for (const page of document.pages) {
      console.log(`Page ${page.pageNumber}`);
      printPageDimensions(page.dimension);
      printDetectedLanguages(page.detectedLanguages);
      printParagraphs(page.paragraphs, text);
      printBlocks(page.blocks, text);
      printLines(page.lines, text);
      printTokens(page.tokens, text);
    }
  }

  const printPageDimensions = dimension => {
    console.log(`    Width: ${dimension.width}`);
    console.log(`    Height: ${dimension.height}`);
  };

  const printDetectedLanguages = detectedLanguages => {
    console.log('    Detected languages:');
    for (const lang of detectedLanguages) {
      const code = lang.languageCode;
      const confPercent = lang.confidence * 100;
      console.log(`        ${code} (${confPercent.toFixed(2)}% confidence)`);
    }
  };

  const printParagraphs = (paragraphs, text) => {
    console.log(`    ${paragraphs.length} paragraphs detected:`);
    const firstParagraphText = getText(paragraphs[0].layout.textAnchor, text);
    console.log(
      `        First paragraph text: ${JSON.stringify(firstParagraphText)}`
    );
    const lastParagraphText = getText(
      paragraphs[paragraphs.length - 1].layout.textAnchor,
      text
    );
    console.log(
      `        Last paragraph text: ${JSON.stringify(lastParagraphText)}`
    );
  };

  const printBlocks = (blocks, text) => {
    console.log(`    ${blocks.length} blocks detected:`);
    const firstBlockText = getText(blocks[0].layout.textAnchor, text);
    console.log(`        First block text: ${JSON.stringify(firstBlockText)}`);
    const lastBlockText = getText(
      blocks[blocks.length - 1].layout.textAnchor,
      text
    );
    console.log(`        Last block text: ${JSON.stringify(lastBlockText)}`);
  };

  const printLines = (lines, text) => {
    console.log(`    ${lines.length} lines detected:`);
    const firstLineText = getText(lines[0].layout.textAnchor, text);
    console.log(`        First line text: ${JSON.stringify(firstLineText)}`);
    const lastLineText = getText(
      lines[lines.length - 1].layout.textAnchor,
      text
    );
    console.log(`        Last line text: ${JSON.stringify(lastLineText)}`);
  };

  const printTokens = (tokens, text) => {
    console.log(`    ${tokens.length} tokens detected:`);
    const firstTokenText = getText(tokens[0].layout.textAnchor, text);
    console.log(`        First token text: ${JSON.stringify(firstTokenText)}`);
    const firstTokenBreakType = tokens[0].detectedBreak.type;
    console.log(`        First token break type: ${firstTokenBreakType}`);
    const lastTokenText = getText(
      tokens[tokens.length - 1].layout.textAnchor,
      text
    );
    console.log(`        Last token text: ${JSON.stringify(lastTokenText)}`);
    const lastTokenBreakType = tokens[tokens.length - 1].detectedBreak.type;
    console.log(`        Last token break type: ${lastTokenBreakType}`);
  };

  // Extract shards from the text field
  const getText = (textAnchor, text) => {
    if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
      return '';
    }

    // First shard in document doesn't have startIndex property
    const startIndex = textAnchor.textSegments[0].startIndex || 0;
    const endIndex = textAnchor.textSegments[0].endIndex;

    return text.substring(startIndex, endIndex);
  };

  // [END documentai_process_ocr_document]
  await processDocument();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});