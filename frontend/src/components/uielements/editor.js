import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import EditorWrapper from './styles/editor.style';
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '', theme: 'snow' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.handleChangeParent(html);
  }

  handleThemeChange(newTheme) {
    if (newTheme === 'core') newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <EditorWrapper>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.props.handleChangeParent}
          value={this.props.value}
          modules={
            this.props.moduleType === 'simple'
              ? Editor.simple_modules
              : this.props.moduleType === 'contents'
              ? Editor.contents_modules
              : Editor.modules
          }
          formats={
            this.props.moduleType === 'simple'
              ? Editor.simple_formats
              : Editor.formats
          }
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
        {/* <div className="themeSwitcher">
          <label>Theme </label>
          <select onChange={e => this.handleThemeChange(e.target.value)}>
            <option value="snow">Snow</option>
            <option value="bubble">Bubble</option>
            <option value="core">Core</option>
          </select>
        </div> */}
      </EditorWrapper>
    );
  }
}

const Size = ReactQuill.Quill.import('attributors/style/size');
Size.whitelist = ['9.75px', '16px', '19.5px', '32.5px'];
ReactQuill.Quill.register(Size, true);

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: ['9.75px', '16px', '19.5px', '32.5px'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
Editor.simple_modules = {
  toolbar: [
    [{ size: ['9.75px', '16px', '19.5px', '32.5px'] }],
    ['bold', 'italic', 'underline'],
  ],
  clipboard: {
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

Editor.simple_formats = ['size', 'bold', 'italic', 'underline'];

let icons = ReactQuill.Quill.import('ui/icons');
icons['image'] =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>';

icons['video'] =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"/><path d="M13 3v6h6"/></svg>';

Editor.contents_modules = {
  toolbar: [
    ['image', 'video'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ size: ['9.75px', '16px', '19.5px', '32.5px'] }],
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
  moduleType: PropTypes.string,
  handleChangeParent: PropTypes.func,
  content: PropTypes.string,
};

export default Editor;
