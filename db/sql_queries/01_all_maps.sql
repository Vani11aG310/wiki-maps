  SELECT m.title, 
  u.name as user_name, 
  case when fm.id is NULL THEN false ELSE true END as is_favourite 
  FROM maps m
  JOIN users u
  ON u.id = m.user_id
  LEFT JOIN favourite_maps fm
  ON fm.map_id = m.id
  AND fm.user_id = u.id
  ORDER by lower(u.name), lower(m.title);
