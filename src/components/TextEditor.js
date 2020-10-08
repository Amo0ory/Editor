import React from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import ColorPic from './ColorPick';
import draftToMarkdown from 'draftjs-to-markdown';
import '../style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextEditor extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
            editorState: EditorState.createEmpty(), // create an empty initial editor state
            display: false, // state for displaying the converted Text
            markdown:'' // state to convert the text into a MarkDown
        };
        
	}
     onEditorStateChange = (editorState)=>{
        this.setState({editorState}) // stores the text into editorState
      
    }
     convertToMarkDownButton = () =>{
        this.setState({display: !this.state.display}); // reverse the value of display state 
      
    }
    
     uploadImageCallBack(file) { //loading the image from your pc into the editor 
        return new Promise(
          (resolve, reject) => {
            const reader = new FileReader(); // eslint-disable-line no-undef
            reader.onload = e => resolve({ data: { link: e.target.result } });
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
          });
      }
    
      render(){
        return(
            <div>
             <div className="shadow">
                <Editor
                   
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="Editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        colorPicker: { component: ColorPic },
                        image: {
                            uploadCallback: this.uploadImageCallBack,
                            previewImage: true,
                        },
                    }}
                />
               
             </div>
             <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button className="btn" onClick={this.convertToMarkDownButton}>Convert To Markdown:</button>
                   
             </div>      
             {this.state.display && <div style={{border: '2px solid grey'}}>
                {draftToMarkdown(convertToRaw(this.state.editorState.getCurrentContent()))}
             </div>}
                  
             
            </div>
        )
      }
}
export default TextEditor;