import ResponsiveDateTimePicker from "@/components/molecules/date_picker/date-time";
import ResponsiveDatePicker from "@/components/molecules/date_picker/date";
import { DayPicker } from "@/components/molecules/date_picker/day-picker";
import { MonthPicker } from "@/components/molecules/date_picker/month-picker";
import { TimePicker } from "@/components/molecules/date_picker/time-picker";
import { YearPicker } from "@/components/molecules/date_picker/year-picker";
import RadioDefault from "@/components/molecules/radio/default";
import RadioHorizontal from "@/components/molecules/radio/horizontal";
import RadioVertical from "@/components/molecules/radio/vertical";
// import SelectAsyncSearch from "@/components/molecules/selects/async-search";
// import SelectDefault from "@/components/molecules/selects/default";
// import MultiSelectChip from "@/components/molecules/selects/multi-select-chip-async-or-default";
// import MultiSelectChipAll from "@/components/molecules/selects/multi-select-with-select-all";
import { TextFieldDefault } from "@/components/molecules/text_fields/default";
import { TextFieldDefaultCurrency } from "@/components/molecules/text_fields/default-currency";
import { TextFieldFilledIcon } from "@/components/molecules/text_fields/filled-icon";
import { TextFieldPassword } from "@/components/molecules/text_fields/password";
import { TextFieldPrefixPostfix } from "@/components/molecules/text_fields/prefix-postfix";
import { TextFieldPrefixPostfixCurrency } from "@/components/molecules/text_fields/prefix-postfix-currency";
import { TextFieldPrefixPostfixUpload } from "@/components/molecules/text_fields/prefix-postfix-upload";
import { TextFieldMultiline } from "@/components/molecules/text_fields/multiline";
import { TextFieldWithButton } from "@/components/molecules/text_fields/with-button";
import React from "react";
import dynamic from "next/dynamic";
// import DateRangePicker from "@/components/molecules/date_picker/date-range";
import ResponsiveDatePickerWithClear from "@/components/molecules/date_picker/date-with-clear";
import YearMonthPicker from "@/components/molecules/date_picker/year-month-picker";

// const TextEditor = dynamic(() => import("../wysiwyg/text-editor"), {
//   ssr: false,
// });

/**
 * Perubahan dari Import SelectWithSearch ke penggunakan dynamic untuk menghilangkan warning log
 */
// const SelectWithSearch = dynamic(() => import('@/components/molecules/selects/normal-search'), { ssr: false });

export const FORM_TYPE = {
  TEXT_FIELD: "text-field",
  TEXT_FIELD_CURRENCY: "text-field-currency",
  TEXT_FIELD_PASSWORD: "text-field-password", // NOSONAR
  TEXT_FIELD_NUMBER: "text-field-number",
  TEXT_FIELD_STATEFUL_ICON: "text-field-filled-icon",
  TEXT_FIELD_PREFIX_POSTFIX: "text-field-prefix-postfix",
  TEXT_FIELD_PREFIX_POSTFIX_CURRENCY: "text-field-prefix-postfix-currency",
  TEXT_FIELD_PREFIX_POSTFIX_UPLOAD: "text-field-prefix-postfix-upload",
  TEXT_FIELD_MULTILINE: "text-field-multiline",
  TEXT_FIELD_WITH_BUTTON: "text-field-with-button",
  DATETIME_PICKER: "date-time-picker",
  DATE_PICKER: "date-picker",
  YEAR_PICKER: "year-picker",
  MONTH_PICKER: "month-picker",
  DAY_PICKER: "day-picker",
  TIME_PICKER: "time-picker",
  DATE_RANGE_PICKER: "date-range-picker",
  DATE_WITH_CLEAR: "date-with-clear",
  YEAR_MONTH_PICKER: "year-month-picker",
  SELECT: "select",
  SELECT_SEARCH_NORMAL: "select-search-normal",
  SELECT_SEARCH_ASYNC: "select-search-async",
  MULTI_SELECT_CHIP: "multi-select-chip",
  MULTI_SELECT_WITH_SELECT_ALL: "multi-select-with-select-all",
  RADIO: "radio",
  RADIO_HORIZONTAL: "radio-horizontal",
  RADIO_VERTICAL: "radio-vertical",
  TEXT_EDITOR: "text-editor",
  CUSTOM: "custom",
};

const FormContent = ({ type, ...restProps }) => {
  switch (type) {
    case FORM_TYPE.TEXT_FIELD:
      return <TextFieldDefault {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_CURRENCY:
      return <TextFieldDefaultCurrency {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_PASSWORD:
      return <TextFieldPassword {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_NUMBER:
      return <TextFieldDefault {...restProps} inputMode="numeric" />;
    case FORM_TYPE.TEXT_FIELD_STATEFUL_ICON:
      return <TextFieldFilledIcon {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_PREFIX_POSTFIX:
      return <TextFieldPrefixPostfix {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_PREFIX_POSTFIX_CURRENCY:
      return <TextFieldPrefixPostfixCurrency {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_PREFIX_POSTFIX_UPLOAD:
      return <TextFieldPrefixPostfixUpload {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_MULTILINE:
      return <TextFieldMultiline {...restProps} />;
    case FORM_TYPE.TEXT_FIELD_WITH_BUTTON:
      return <TextFieldWithButton {...restProps} />;
    case FORM_TYPE.DATETIME_PICKER:
      return <ResponsiveDateTimePicker {...restProps} />;
    case FORM_TYPE.DATE_PICKER:
      return <ResponsiveDatePicker {...restProps} />;
    case FORM_TYPE.YEAR_PICKER:
      return <YearPicker {...restProps} />;
    case FORM_TYPE.MONTH_PICKER:
      return <MonthPicker {...restProps} />;
    case FORM_TYPE.DAY_PICKER:
      return <DayPicker {...restProps} />;
    case FORM_TYPE.TIME_PICKER:
      return <TimePicker {...restProps} />;
    // case FORM_TYPE.DATE_RANGE_PICKER:
    //   return <DateRangePicker {...restProps} />;
    case FORM_TYPE.DATE_WITH_CLEAR:
      return <ResponsiveDatePickerWithClear {...restProps} />;
    case FORM_TYPE.YEAR_MONTH_PICKER:
      return <YearMonthPicker {...restProps} />;
    // case FORM_TYPE.SELECT:
    //   return <SelectDefault {...restProps} />;
    // case FORM_TYPE.SELECT_SEARCH_NORMAL:
    //   return <SelectWithSearch {...restProps} />;
    // case FORM_TYPE.SELECT_SEARCH_ASYNC:
    //   return <SelectAsyncSearch {...restProps} />;
    // case FORM_TYPE.MULTI_SELECT_CHIP:
    //   return <MultiSelectChip {...restProps} />;
    // case FORM_TYPE.MULTI_SELECT_WITH_SELECT_ALL:
    //   return <MultiSelectChipAll {...restProps} />;
    case FORM_TYPE.RADIO:
      return <RadioDefault {...restProps} />;
    case FORM_TYPE.RADIO_HORIZONTAL:
      return <RadioHorizontal {...restProps} />;
    case FORM_TYPE.RADIO_VERTICAL:
      return <RadioVertical {...restProps} />;
    // case FORM_TYPE.TEXT_EDITOR:
    //   return <TextEditor {...restProps} />;
    case FORM_TYPE.CUSTOM:
      return restProps.component;
    default:
      return null;
  }
};

const Form = ({ children, className, methods, onSubmit }) => {
  return (
    <form className={className} onSubmit={methods?.handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                control: methods?.control,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

const SubForm = ({ children, className, methods }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                control: methods?.control,
                key: child.props.name,
              },
            })
          : child;
      })}
    </div>
  );
};

export const FormBuilder = ({ className, fields = [], methods, onSubmit }) => {
  return (
    <Form className={className} methods={methods} onSubmit={onSubmit}>
      {fields.map((item, index) => (
        <FormContent key={`form-item-${index}`} {...item} />
      ))}
    </Form>
  );
};

export const SubFormBuilder = ({ className, fields = [], methods }) => {
  return (
    <SubForm className={className} methods={methods}>
      {fields.map((item, index) => (
        <FormContent key={`subform-item-${index}`} {...item} />
      ))}
    </SubForm>
  );
};
