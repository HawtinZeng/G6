import type { ClickSelectOptions } from '@/src/behaviors';
import data from '@@/dataset/oneThousandNodes.json';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { BreathingCircle } from './breathingCircle';

export const behaviorClickSelect: TestCase = async (context) => {
  register(ExtensionCategory.NODE, 'breathing-circle', BreathingCircle);

  const graph = new Graph({
    ...context,
    data,
    animation: false,
    layout: {
      type: 'd3-force',
      collide: {
        radius: 30,
      },
      animation: false,
    },
    behaviors: [
      'zoom-canvas',
      { type: 'click-select', key: 'click-select' },
      'drag-element',
      { type: 'hover-activate', degree: 1 },
    ],
    node: {
      type: 'breathing-circle',
      style: {
        halo: true,
        size: 30,
        labelText: (d) => d.id,
      },
      //type: 'breathing-circle',
    },
    autoResize: true,
  });

  await graph.render();

  const config = {
    multiple: false,
    trigger: ['shift'],
    degree: 0,
    state: 'selected',
    unselectedState: undefined,
  };

  const updateClickSelectOption = (options: Partial<ClickSelectOptions>) => {
    graph.updateBehavior({ key: 'click-select', ...options });
  };

  behaviorClickSelect.form = (panel) => [
    panel
      .add(config, 'multiple')
      .name('Multiple')
      .onChange((multiple: boolean) => updateClickSelectOption({ multiple })),
    panel
      .add(config, 'trigger', ['Shift', 'Control', 'Alt', 'Meta'])
      .name('Trigger')
      .onChange((trigger: string) => updateClickSelectOption({ trigger: [trigger] })),
    panel
      .add(config, 'degree', [0, 1, 2, 3])
      .name('Degree')
      .onChange((degree: number) => updateClickSelectOption({ degree })),
  ];

  return graph;
};
