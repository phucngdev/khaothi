// import { ButtonView, Plugin } from 'ckeditor5';
// import InsertBlankCommand from './InsertBlankPlugin';

// export default class BlankPlugin extends Plugin {
//   static get pluginName() {
//     return 'BlankPlugin';
//   }

//   init() {
//     const editor = this.editor;

//     // Đăng ký command
//     editor.commands.add('insertBlank', new InsertBlankCommand(editor));

//     // Đăng ký nút toolbar
//     editor.ui.componentFactory.add('insertBlank', locale => {
//       const view = new ButtonView(locale);

//       view.set({
//         label: 'Insert Blank',
//         withText: true, // hiện chữ thay vì icon
//         tooltip: true,
//       });

//       // bind trạng thái với command
//       const command = editor.commands.get('insertBlank');
//       view.bind('isEnabled').to(command as any, 'isEnabled');

//       // click = execute command
//       this.listenTo(view, 'execute', () => {
//         editor.execute('insertBlank');
//         editor.editing.view.focus();
//       });

//       return view;
//     });
//   }
// }
import { ButtonView, Plugin } from 'ckeditor5';
import InsertBlankCommand from './InsertBlankPlugin';

export default class BlankPlugin extends Plugin {
  static get pluginName() {
    return 'BlankPlugin';
  }

  init() {
    const editor = this.editor;

    // Schema: cho phép "blank" inline trong paragraph
    editor.model.schema.register('blank', {
      allowWhere: '$text',
      isInline: true,
      isObject: true,
      allowAttributes: ['index'],
    });

    // View <-> Model conversion
    editor.conversion.for('downcast').elementToElement({
      model: 'blank',
      view: (modelElement, { writer }) => {
        const index = modelElement.getAttribute('index');
        return writer.createContainerElement('span', {
          class: 'blank',
          'data-index': index,
        });
      },
    });

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: 'blank',
      },
      model: (viewElement, { writer }) => {
        const index = viewElement.getAttribute('data-index');
        return writer.createElement('blank', { index });
      },
    });

    // Command
    editor.commands.add('insertBlank', new InsertBlankCommand(editor));

    // Toolbar button
    editor.ui.componentFactory.add('insertBlank', locale => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Insert Blank',
        withText: true,
        tooltip: true,
      });
      view.on('execute', () => editor.execute('insertBlank'));
      return view;
    });
  }
}
