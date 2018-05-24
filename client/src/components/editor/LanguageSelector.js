import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const languageSelector = props => {
  const { value, onChangeLanguage, options, className: classNameProp } = props;
  return (
    <form className={classNameProp}>
      <FormControl>
        <InputLabel htmlFor="lang-simple">Language</InputLabel>
        <Select value={value} onChange={onChangeLanguage}>
          {options.map(option => (
            <MenuItem key={option.name} value={option.name}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose the language you are familar</FormHelperText>
      </FormControl>
    </form>
  );
};

export default languageSelector;
