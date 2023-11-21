"""empty message

Revision ID: 89b049015823
Revises: e17162c6ffd3
Create Date: 2023-11-20 14:20:15.961098

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89b049015823'
down_revision = 'e17162c6ffd3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comment', schema=None) as batch_op:
        batch_op.drop_column('likes')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('likes', sa.INTEGER(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###