
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.search?.category || null,
  }));

  const [categories, setCategories] = useState({ rootCategories: [] });

  const formatCategories = (items) => {
    const categoryMap = new Map();
    items.forEach(item => {
      categoryMap.set(item._id, {
        id: item._id,
        value: item._id,
        title: item.title,
        parentId: item.parent ? item.parent._id : null,
        children: []
      });
    });

    const rootCategories = [];
    categoryMap.forEach(category => {
      if (category.parentId) {
       const parentCategory = categoryMap.get(category.parentId);
        if (parentCategory) {
          parentCategory.children.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  };

  const formatCategoryHierarchy = (categories, prefix = '') => {
    return categories.flatMap(category => {
      const formattedTitle = `${prefix}${category.title}`;
      const result = [{ value: category.value, title: formattedTitle }];

      if (category.children && category.children.length > 0) {
        result.push(...formatCategoryHierarchy(category.children, `${prefix}-`));
      }
return result;
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchCategories() {
      try {
        const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)', {
          signal: abortController.signal,
        });

        const data = await response.json();
        const formatted = formatCategories(data.result.items);
        setCategories({ rootCategories: formatted });
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    }

    fetchCategories();
    return () => abortController.abort();
  }, []);

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSelectCategory: useCallback(category => {
      store.actions.catalog.setParams({ search:{category}, page: 1 });
    }, [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ], []),

    categories: useMemo(() => [
      { value: null, title: 'Все' },
      ...formatCategoryHierarchy(categories.rootCategories),
    ], [categories]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onSelectCategory}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('Поиск')}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);

