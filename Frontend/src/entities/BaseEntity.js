class BaseEntity {
	constructor() {
		this.mode = null;
		this.is_paging = 1;
		this.created_by = '';
		this.created_date = '';
		this.updated_by = '';
		this.updated_date = '';
		this.is_active = -1;
		this.is_delete = 0;
		this.current_row = 0;
	}
}
export default BaseEntity;