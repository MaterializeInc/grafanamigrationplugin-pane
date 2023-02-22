import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'preamble',
      name: 'Preamble',
      description: 'Text to write before the link to the new dashboard. This can be markdown',
      settings: {
        useTextarea: true,
        rows: 25,
      },
    })
    .addTextInput({
      path: 'linkText',
      name: 'Link text',
      description: 'The text to put on the link to the new dashboard',
      defaultValue: 'Visit this dashboard in the new location',
    })
    .addTextInput({
      path: 'hostname',
      name: 'New Grafana hostname:',
      description: 'The hostname under which the new grafana instance lives',
    })
    .addNumberInput({
      path: 'port',
      name: "New Grafana instance's port:",
      description: 'The port under which the new grafana instance lives (usually 443 for https, 80 for http)',
      defaultValue: 443,
    })
    .addTextInput({
      path: 'protocol',
      name: "New Grafana instance's URL scheme:",
      description: 'https or http. You want https.',
      defaultValue: 'https',
    });
});
