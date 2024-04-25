import { Input } from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '@iso/lib/helpers/rtl';
const { Search, TextArea, Group, Password } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

const WDStyledInputs = InputSearchWrapper(Password);
const PasswordInput = WithDirection(WDStyledInputs);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default StyledInput;
export { InputSearch, InputGroup, Textarea, PasswordInput };
