import Markerable from './_markerable';
import { normalizeTagName } from '../utils/dom-utils';
import { MARKUP_SECTION_TYPE } from './types';

export const VALID_MARKUP_SECTION_TAGNAMES = [
  'p', 'h3', 'h2', 'h1', 'blockquote', 'ul', 'ol'
].map(normalizeTagName);
export const DEFAULT_TAG_NAME = VALID_MARKUP_SECTION_TAGNAMES[0];

const MarkupSection = class MarkupSection extends Markerable {
  constructor(tagName=DEFAULT_TAG_NAME, markers=[]) {
    super(MARKUP_SECTION_TYPE, tagName, markers);
  }

  setTagName(newTagName) {
    newTagName = normalizeTagName(newTagName);
    if (VALID_MARKUP_SECTION_TAGNAMES.indexOf(newTagName) === -1) {
      throw new Error(`Cannot change section tagName to "${newTagName}`);
    }
    this.tagName = newTagName;
  }

  resetTagName() {
    this.tagName = DEFAULT_TAG_NAME;
  }

  splitAtMarker(marker, offset=0) {
    let [beforeSection, afterSection] = [
      this.builder.createMarkupSection(this.tagName, []),
      this.builder.createMarkupSection()
    ];

    return this._redistributeMarkers(beforeSection, afterSection, marker, offset);
  }

};

export default MarkupSection;
