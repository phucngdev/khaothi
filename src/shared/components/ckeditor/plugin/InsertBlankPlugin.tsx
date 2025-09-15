// import { Command } from 'ckeditor5';

// export default class InsertBlankCommand extends Command {
//   execute() {
//     const editor = this.editor;

//     editor.model.change(writer => {
//       const insertPosition = editor.model.document.selection.getFirstPosition();
//       writer.insertText('____', insertPosition!);
//     });
//   }
// }
import { Command } from 'ckeditor5';

export default class InsertBlankCommand extends Command {
  private blankCounter = 0;

  execute() {
    const editor = this.editor;
    this.blankCounter++;

    editor.model.change(writer => {
      const insertPosition = editor.model.document.selection.getFirstPosition();

      if (!insertPosition) {
        return;
      }

      // Tạo custom element "blank"
      const blankElement = writer.createElement('blank', {
        index: String(this.blankCounter),
      });

      writer.insert(blankElement, insertPosition);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const parent = selection.focus?.parent;

    if (parent && parent.is('element')) {
      this.isEnabled = model.schema.checkChild(parent, 'blank');
    } else {
      this.isEnabled = false;
    }
  }
}
