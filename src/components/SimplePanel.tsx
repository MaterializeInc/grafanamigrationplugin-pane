import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    link: css`
      text-decoration: underline;
      width: 100%;
      text-align: center;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  let location = new URL(window.location.href);
  location.hostname = options.hostname;
  location.port = options.port.toString();
  location.protocol = options.protocol;
  return (
    <div>
      <ReactMarkdown>{options.preamble}</ReactMarkdown>
      <h1 className={styles.link}>
        <a href={location.href}>{options.linkText}</a>
      </h1>
    </div>
  );
};
