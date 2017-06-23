// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using EzInsurance.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EzInsurance.DAL.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        #region Private Fields

        protected readonly DbContext Context;
        protected readonly DbSet<TEntity> Entities;

        #endregion


        #region Constructors

        public Repository(DbContext context)
        {
            this.Context = context;
            this.Entities = context.Set<TEntity>();
        }

        #endregion


        #region Public Methods

        public virtual void Add(TEntity entity)
        {
            this.Entities.Add(entity);
        }

        public virtual void AddRange(IEnumerable<TEntity> entities)
        {
            this.Entities.AddRange(entities);
        }

        public virtual void Update(TEntity entity)
        {
            this.Entities.Update(entity);
        }

        public virtual void UpdateRange(IEnumerable<TEntity> entities)
        {
            this.Entities.UpdateRange(entities);
        }

        public virtual void Remove(TEntity entity)
        {
            this.Entities.Remove(entity);
        }

        public virtual void RemoveRange(IEnumerable<TEntity> entities)
        {
            this.Entities.RemoveRange(entities);
        }

        public virtual int Count()
        {
            return this.Entities.Count();
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Entities.Where(predicate);
        }

        public virtual TEntity GetSingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Entities.SingleOrDefault(predicate);
        }

        public virtual TEntity Get(int id)
        {
            return this.Entities.Find(id);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return this.Entities.ToList();
        }

        #endregion
    }
}
